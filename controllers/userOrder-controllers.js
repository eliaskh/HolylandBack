const HttpError = require('../models/http-error');
const { v4: uuid } = require('uuid');
const { validationResult } = require('express-validator');
const UserOrder = require('../models/userOrder');
const User = require('../models/user');

const getOrders = async (req, res, next) => {
  let orders;
  try {
    orders = await UserOrder.find();
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
    name,
    email,
    shopId,
    sid,
  } = req.body;
  const newOrder = new UserOrder({
    considerTourLeader,
    tourGuideName,
    tourLeaderC,
    tourLeaderName,
    total,
    date,
    productsList,
    customerOrders,
    userId,
    name,
    email,
    shopId,
    sid,
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
    order = await UserOrder.findById(OrderId);
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
    order = await UserOrder.findById(orderId);
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
    name,
    email,
    shopId,
  } = req.body;
  const orderId = req.params.pid;
  let order;
  try {
    order = await UserOrder.findById(orderId);
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
    order.name = name;
    order.email = email;
    order.shopId = shopId;

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
