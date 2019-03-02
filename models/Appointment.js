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
  from: {
    type: Date,
    required: true
  },
  to: {
    type: Date,
    required: true
  }
});

module.exports = Appointment = mongoose.model("appointment", AppointmentSchema);
