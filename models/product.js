const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
  title: { type: String, required: false },
  about: { type: String, require: false },
  image: { type: String, required: false },
  price: { type: Number, required: false },
});

module.exports = mongoose.model('Product', productSchema);
