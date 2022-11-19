const express = require('express');
const router = express.Router();
const ordercontrollers = require('../controllers/orders-controllers');
const { check } = require('express-validator');
const upload = require('./../multer.js');
const fs = require('fs');

router.get('/', ordercontrollers.getOrders);

router.post('/add', ordercontrollers.addOrder);

router.delete('/:pid', ordercontrollers.deleteOrder);
router.put('/:pid', ordercontrollers.updateOrder);
router.put('/:pid/update-status', ordercontrollers.updateOrderStatus);

module.exports = router;
