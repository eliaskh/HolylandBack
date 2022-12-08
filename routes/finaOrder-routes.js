const express = require('express');
const router = express.Router();
const finalOrderController = require('../controllers/finalOrder-controllers');
const { check } = require('express-validator');
const upload = require('./../multer.js');
const fs = require('fs');

router.get('/', finalOrderController.getFinalOrder);

router.post('/add', finalOrderController.addFinalOrder);

router.delete('/:pid', finalOrderController.deleteFinalOrder);

router.put('/:pid/update-final', finalOrderController.updateFinalOrder);

router.put('/:pid/update-shop', finalOrderController.updateShop);
router.put(
  '/:pid/update-final-status',
  finalOrderController.updateFinalOrderStatus
);

module.exports = router;
