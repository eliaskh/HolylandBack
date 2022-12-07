const HttpError = require('../models/http-error');
const { v4: uuid } = require('uuid');
const { validationResult } = require('express-validator');
const FinalOrder = require('../models/finalOrder');
const User = require('../models/user');

const getFinalOrder = async (req, res, next) => {
  let finalOrder;
  try {
    finalOrder = await FinalOrder.find();
  } catch (err) {
    const error = new HttpError('can not find the users', 5000);
    return next(error);
  }

  res.json(finalOrder.map((order) => order.toObject({ getters: true })));
};

const addFinalOrder = async (req, res, next) => {
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
    deliveryTime,
    deliveryDate,
    deliveryLocation,
    country,
    guidePhone,
    shopTitle,
  } = req.body;
  const newOrder = new FinalOrder({
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
    deliveryTime,
    deliveryDate,
    deliveryLocation,
    country,
    guidePhone,
    shopTitle,
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

const updateFinalOrder = async (req, res, next) => {
  const {
    deliveryTime,
    deliveryDate,
    deliveryLocation,
    guidePhone,
    customerOrders,
    statusofOrder,
    total,
  } = req.body;
  const orderId = req.params.pid;
  let order;
  try {
    order = await FinalOrder.findById(orderId);
  } catch (err) {
    console.log('Error', err);
    const error = new HttpError(
      'we can not update your Place details, sorry ',
      500
    );
    return next(error);
  }

  {
    order.deliveryTime = deliveryTime;
    order.deliveryDate = deliveryDate;
    order.deliveryLocation = deliveryLocation;
    order.guidePhone = guidePhone;
    order.customerOrders = customerOrders;
    order.statusofOrder = statusofOrder;
    order.total = total;
    // order.country = country;
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

const updateFinalOrderStatus = async (req, res, next) => {
  const { statusofOrder } = req.body;
  const orderId = req.params.pid;
  let order;
  try {
    order = await FinalOrder.findById(orderId);
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

    // order.country = country;
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

const deleteFinalOrder = async (req, res, next) => {
  const OrderId = req.params.pid;
  let finalOrder;
  try {
    finalOrder = await FinalOrder.findById(OrderId);
  } catch (err) {
    const error = new HttpError('can not delete the order', 500);
    return next(error);
  }
  try {
    await finalOrder.remove();
  } catch (err) {
    const error = new HttpError('can not delete the order', 500);
    return next(error);
  }
  res.status(200).json({ message: 'order deleted' });
};

exports.getFinalOrder = getFinalOrder;
exports.addFinalOrder = addFinalOrder;
exports.deleteFinalOrder = deleteFinalOrder;
exports.updateFinalOrder = updateFinalOrder;
exports.updateFinalOrderStatus = updateFinalOrderStatus;
