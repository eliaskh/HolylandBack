const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderScehma = new Schema({
  considerTourLeader: { type: Boolean },
  tourGuideName: { type: String, required: false },
  tourLeaderC: { type: Number },
  tourLeaderName: { type: String, required: false },
  total: { type: Number },
  date: {
    type: Date,
    default: Date.now,
  },
  productsList: [],
  orders: [],
  userId: { type: String, required: false },
});
module.exports = mongoose.model('Order', orderScehma);
