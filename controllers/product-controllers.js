const HttpError = require('../models/http-error');
const { v4: uuid } = require('uuid');
const { validationResult } = require('express-validator');
const Product = require('./../models/product');
const fs = require('fs');

const getProducts = async (req, res, next) => {
  let products;
  try {
    products = await Product.find();
  } catch (err) {
    const error = new HttpError('can not find the users', 5000);
    return next(error);
  }

  res.json(products.map((product) => product.toObject({ getters: true })));
};

const addProduct = async (req, res, next) => {
  const { title, about, image, price } = req.body;
  const newProduct = new Product({
    title,
    about,
    // imgsData: imgsData,
    image,
    price,
  });
  console.log(newProduct);
  newProduct
    .save()
    .then((product) => {
      return res.json(newProduct.toObject({ getters: true }));
    })
    .catch((error) => {
      return res.json({ error });
    });
};

const deleteProduct = async (req, res, next) => {
  const ProductId = req.params.pid;
  let product;
  try {
    product = await Product.findById(ProductId);
  } catch (err) {
    const error = new HttpError('can not delete the Product', 500);
    return next(error);
  }
  try {
    await product.remove();
  } catch (err) {
    const error = new HttpError('can not delete Product', 500);
    return next(error);
  }
  res.status(200).json({ message: 'Product deleted' });
};

const updateProduct = async (req, res, next) => {
  // const file = req.files.photo;
  // const error = validationResult(req); //validator
  // if (!error.isEmpty()) {
  //   throw new HttpError(
  //     'unable to update your data,,invalid input passed, please check your data ',
  //     422
  //   );
  // }
  const { title, about, image, price } = req.body;

  const productId = req.params.pid;
  let product;
  try {
    product = await Product.findById(productId);
  } catch (err) {
    console.log('Error', err);
    const error = new HttpError(
      'we can not update your Place details, sorry ',
      500
    );
    return next(error);
  }

  {
    product.title = title;
    product.about = about;
    product.image = image;
    product.price = price;
    // product.imgsData = imgsData;

    product
      .save()
      .then(() => {
        res.status(200).json({ product: product.toObject({ getters: true }) });
      })
      .catch((error) => {
        res.json({ error });
      });
  }
};

const getProductById = async (req, res, next) => {
  const productId = req.params.pid; // { pid: 'p1' }

  let product;
  try {
    product = await Product.findById(productId);
  } catch (err) {
    const error = new HttpError(
      'Something went wrong, could not find a place.',
      500
    );
    return next(error);
  }

  if (!product) {
    const error = new HttpError(
      'Could not find a place for the provided id.',
      404
    );
    return next(error);
  }

  res.json({ product: product.toObject({ getters: true }) }); // => { place } => { place: place }
};

exports.addProduct = addProduct;
exports.getProducts = getProducts;
exports.deleteProduct = deleteProduct;
exports.updateProduct = updateProduct;
exports.getProductById = getProductById;
