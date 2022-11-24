const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userOrderScehma = new Schema({
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
  customerOrders: [],
  userId: { type: String, required: false },
  name: { type: String, required: false },
  email: { type: String },
  phoneNumber: { type: String, required: false },
  shopId: { type: String, required: false },
  sid: { type: String, required: false },
});
module.exports = mongoose.model('UserOrder', userOrderScehma);
