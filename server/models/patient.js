const mongoose = require("mongoose");

mongoose.Promise = global.Promise;

const patientSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: {
        firstName: String,
        lastName: String
    },
  age: String,
  blood_group: String,
  contact: String,
  address: String,
  profilePicture: Buffer,
  created_at: {
    type: Date
  },
  updated_at: {
    type: Date
  },
});
var patient=mongoose.model('Patient', patientSchema);
module.exports=patient;