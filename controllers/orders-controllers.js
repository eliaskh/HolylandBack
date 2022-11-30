const HttpError = require('../models/http-error');
const { v4: uuid } = require('uuid');
const { validationResult } = require('express-validator');
const Order = require('../models/orders');
const User = require('../models/user');

const getOrders = async (req, res, next) => {
  let orders;
  try {
    orders = await Order.find();
  } catch (err) {
    const error = new HttpError('can not find the users', 5000);
    return next(error);
  }

  res.json(orders.map((order) => order.toObject({ getters: true })));
};

const addOrder = async (req, res, next) => {
  const {
    considerTourLeader,
    tourGuideName,
    tourLeaderC,
    tourLeaderName,
    total,
    date,
    productsList,
    customerOrders,
    userId,
    statusofOrder,
    sid,
    shopTitle,
    country,
    guidePhone,
  } = req.body;
  const newOrder = new Order({
    considerTourLeader,
    tourGuideName,
    tourLeaderC,
    tourLeaderName,
    total,
    date,
    productsList,
    customerOrders,
    userId,
    statusofOrder,
    sid,
    shopTitle,
    country,
    guidePhone,
  });
  console.log(newOrder);
  newOrder
    .save()
    .then((order) => {
      return res.json(newOrder.toObject({ getters: true }));
    })

    .catch((error) => {
      return res.json({ error });
    });
};

const deleteOrder = async (req, res, next) => {
  const OrderId = req.params.pid;
  let order;
  try {
    order = await Order.findById(OrderId);
  } catch (err) {
    const error = new HttpError('can not delete the order', 500);
    return next(error);
  }
  try {
    await order.remove();
  } catch (err) {
    const error = new HttpError('can not delete the order', 500);
    return next(error);
  }
  res.status(200).json({ message: 'order deleted' });
};

const getOrderById = async (req, res, next) => {
  const orderId = req.params.pid; // { pid: 'p1' }

  let order;
  try {
    order = await Order.findById(orderId);
  } catch (err) {
    const error = new HttpError(
      'Something went wrong, could not find this shop',
      500
    );
    return next(error);
  }

  if (!order) {
    const error = new HttpError(
      'Could not find a shop for the provided id.',
      404
    );
    return next(error);
  }

  res.json({ order: ordertoObject({ getters: true }) }); // => { place } => { place: place }
};

const updateOrder = async (req, res, next) => {
  const {
    considerTourLeader,
    tourGuideName,
    tourLeaderC,
    tourLeaderName,
    total,
    date,
    productsList,
    customerOrders,
    userId,
    statusofOrder,
    shopTitle,
    country,
    guidePhone,
  } = req.body;
  const orderId = req.params.pid;
  let order;
  try {
    order = await Order.findById(orderId);
  } catch (err) {
    console.log('Error', err);
    const error = new HttpError(
      'we can not update your Place details, sorry ',
      500
    );
    return next(error);
  }

  {
    order.considerTourLeader = considerTourLeader;
    order.tourGuideName = tourGuideName;
    order.tourLeaderC = tourLeaderC;
    order.tourLeaderName = tourLeaderName;
    order.total = total;
    order.date = date;
    order.productsList = productsList;
    order.customerOrders = customerOrders;
    order.userId = userId;
    order.statusofOrder = statusofOrder;
    order.shopTitle = shopTitle;
    order.country = country;
    order.guidePhone = guidePhone;

    order
      .save()
      .then(() => {
        res.status(200).json({ order: order.toObject({ getters: true }) });
      })
      .catch((error) => {
        res.json({ error });
      });
  }
};

const updateOrderStatus = async (req, res, next) => {
  const { statusofOrder } = req.body;
  const orderId = req.params.pid;
  let order;
  try {
    order = await Order.findById(orderId);
  } catch (err) {
    console.log('Error', err);
    const error = new HttpError(
      'we can not update your Place details, sorry ',
      500
    );
    return next(error);
  }

  {
    order.statusofOrder = statusofOrder;

    order
      .save()
      .then(() => {
        res.status(200).json({ order: order.toObject({ getters: true }) });
      })
      .catch((error) => {
        res.json({ error });
      });
  }
};

const updatePhoneNumber = async (req, res, next) => {
  const { guidePhone } = req.body;
  const orderId = req.params.pid;
  let order;
  try {
    order = await Order.findById(orderId);
  } catch (err) {
    console.log('Error', err);
    const error = new HttpError(
      'we can not update your Place details, sorry ',
      500
    );
    return next(error);
  }

  {
    order.guidePhone = guidePhone;

    order
      .save()
      .then(() => {
        res.status(200).json({ order: order.toObject({ getters: true }) });
      })
      .catch((error) => {
        res.json({ error });
      });
  }
};

exports.getOrders = getOrders;
exports.addOrder = addOrder;
exports.deleteOrder = deleteOrder;
exports.getOrderById = getOrderById;
exports.updateOrder = updateOrder;
exports.updateOrderStatus = updateOrderStatus;
exports.updatePhoneNumber = updatePhoneNumber;
