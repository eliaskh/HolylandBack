const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const finalorderScehma = new Schema({
  considerTourLeader: { type: Boolean }, //done 1
  tourGuideName: { type: String, required: false }, //done 2
  tourLeaderC: { type: Number }, //done 3
  tourLeaderName: { type: String, required: false }, //done 4
  total: { type: Number }, //done 5
  date: {
    type: Date,
    default: Date.now,
  }, //done 6
  productsList: [], //done 7
  customerOrders: [], //done 8
  userId: { type: String, required: false }, //done 9
  statusofOrder: { type: String, required: false }, //10
  sid: { type: String, required: false }, //done 12
  deliveryTime: { type: String, required: false }, //done 13
  deliveryDate: { type: String, required: false }, //done 14
  deliveryLocation: { type: String, required: false }, //done 15
  country: {}, //done 16
  guidePhone: { type: String, required: false }, //done 17
  shopTitle: { type: String, required: false }, //18
  note: { type: String, required: false },
});
module.exports = mongoose.model('FinalOrder', finalorderScehma);
