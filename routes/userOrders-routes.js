const express = require('express');
const router = express.Router();
const userOrderControllers = require('../controllers/userOrder-controllers');
const { check } = require('express-validator');
const upload = require('./../multer.js');
const fs = require('fs');

router.get('/', userOrderControllers.getOrders);

router.post('/add', userOrderControllers.addOrder);

router.delete('/:pid', userOrderControllers.deleteOrder);
router.put('/:pid', userOrderControllers.updateOrder);

module.exports = router;
