const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AppointmentSchema = new Schema({
  doctor: {
    type: Schema.Types.ObjectId,
    ref: "doctor"
  },
  patient: {
    type: Schema.Types.ObjectId,
    ref: "patient"
  },
  date: {
    type: String,
    required: true
  },
  from: {
    type: String,
    required: true
  },
  to: {
    type: String,
    required: true
  }
});

module.exports = Appointment = mongoose.model("appointment", AppointmentSchema);
