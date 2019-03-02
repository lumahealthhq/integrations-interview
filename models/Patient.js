const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PatientSchema = new Schema({
  name: {
    type: String,
    required: true
  }
});

module.exports = Patient = mongoose.model("patient", PatientSchema);
