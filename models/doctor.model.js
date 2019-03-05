const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var DailySchema = new Schema({
  day: {type: String, required: true, max: 50},
  hours_from: {type: String, required: true, max: 50},
  hours_to: {type: String, required: true, max: 50},
});

let DoctorSchema = new Schema({
  name: {type: String, required: true, max: 100},
  working_hours: [DailySchema]
});

// export the model
module.exports = mongoose.model('Doctor', DoctorSchema);