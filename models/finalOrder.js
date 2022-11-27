const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const finalorderScehma = new Schema({
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
  statusofOrder: { type: String, required: false },
  sid: { type: String, required: false },
  deliveryTime: { type: String, required: false },
  deliveryDate: { type: String, required: false },
  deliveryLocation: { type: String, required: false },
  country: { type: String, required: false },
});
module.exports = mongoose.model('FinalOrder', finalorderScehma);
