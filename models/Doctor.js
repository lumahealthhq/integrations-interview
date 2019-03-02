const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const DoctorSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  workinghours: [
    {
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
    }
  ]
});

module.exports = Doctor = mongoose.model("doctor", DoctorSchema);
