const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const patient = new Schema({
  patientId :             {type: Number, required: true, unique: true},
  firstName :             {type: String, required: true},
  lastName :              {type: String, required: true},
  gender :                {type: String, required: true},
  weight :                {type: Number, required: true},
  height :                {type: Number, required: true},
  origin :                {type: Number, required: true}, //1. Asian 2...
  allergic :              {type: [Number], required: false},
  updatedAt :             {type: Date, required: false}
});

patient.statics.getPatient = function() {
  return new Promise((resolve, reject) => {
    this.find({}).sort({"_id": 1}).then((patients) => {
      resolve(patients);
    })
  });
}

patient.statics.getPatientById = function(id) {
  return new Promise((resolve, reject) => {
    this.find({patientId: id}).sort({"_id": 1}).then((patient) => {
      resolve(patient);
    })
  });
}

patient.statics.createPatient = function(firstName, lastName, gender, weight, height, origin, allergic) { 
  return new Promise ((resolve, reject) => {
    this.find({})
      .sort({ patientId: -1 }).exec((err, patient) => {
        // if (err) throw err;
        const newPatient = new this();
        newPatient.patientId = typeof patient[0] === "undefined" ? 0 : parseInt(patient[0].patientId)+1;
        newPatient.firstName = firstName;
        newPatient.lastName = lastName;
        newPatient.gender = gender;
        newPatient.weight = weight;
        newPatient.height = height;
        newPatient.origin = origin;
        newPatient.allergic = allergic;
        newPatient.updatedAt = new Date().toString();
        // save the message
        newPatient.save()
      .then((patient) => {
        resolve(patient);
      })
    });
  });
}


const patientModel = mongoose.model('patient', patient);
module.exports = patientModel;
