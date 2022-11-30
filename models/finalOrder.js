const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const finalorderScehma = new Schema({
  considerTourLeader: { type: Boolean }, //done
  tourGuideName: { type: String, required: false }, //done
  tourLeaderC: { type: Number }, //done
  tourLeaderName: { type: String, required: false }, //done
  total: { type: Number }, //done
  date: {
    type: Date,
    default: Date.now,
  }, //done
  productsList: [], //done
  customerOrders: [], //done
  userId: { type: String, required: false }, //done
  statusofOrder: { type: String, required: false },
  sid: { type: String, required: false }, //done
  deliveryTime: { type: String, required: false }, //done
  deliveryDate: { type: String, required: false }, //done
  deliveryLocation: { type: String, required: false }, //done
  country: {}, //done
  guidePhone: { type: String, required: false }, //done
});
module.exports = mongoose.model('FinalOrder', finalorderScehma);
