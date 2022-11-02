const express = require('express');
const router = express.Router();
const productcontrollers = require('../controllers/product-controllers');
const { check } = require('express-validator');
const upload = require('./../multer.js');
const fs = require('fs');
const { route } = require('./users-routes');

router.get('/', productcontrollers.getProducts);
router.post('/add', productcontrollers.addProduct);
router.delete('/:pid', productcontrollers.deleteProduct);
router.put('/:pid', productcontrollers.updateProduct);

module.exports = router;
