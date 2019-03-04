const mongoose = require("mongoose");
const Schedule = require("./schedule");
const Schema = mongoose.Schema;


const doctor = new Schema({
  doctorId :              {type: Number, required: true, unique: true},
  firstName :             {type: String, required: true},
  lastName :              {type: String, required: true},
  gender :                {type: String, required: true},
  scheduleType :          {type: Number, required: true}, //1. 8:00 - 17:00 2. 17:00 - 24:00
  specialties :           {type: [Number], required: false}, //1. Cardiothoracic Radiology 2. Hand Surgery 
  updatedAt :             {type: Date, required: false}
});

doctor.statics.getDoctor = function() { //A normal function declaration for the static function instead of the arrow so that it still preserves Mongoose's meaning of 'this' within the function:
  return new Promise((resolve, reject) => {
    this.find({}).sort({"_id": 1}).then((doctors) => {
      resolve(doctors);
    })
  });
}

doctor.statics.getDoctorById = function(id) {
  return new Promise((resolve, reject) => {
    this.find({doctorId: id}).sort({"_id": 1}).then((doctor) => {
      resolve(doctor);
    })
  });
}

doctor.statics.createDoctor = function(firstName, lastName, gender, scheduleType, specialties) { 
  return new Promise ((resolve, reject) => {
    this.find({})
      .sort({ doctorId: -1 }).exec((err, doc) => {
        // if (err) throw err;
        const newDoctor = new this();
        newDoctor.doctorId = typeof doc[0] === "undefined" ? 0 : parseInt(doc[0].doctorId)+1;
        newDoctor.firstName = firstName;
        newDoctor.lastName = lastName;
        newDoctor.gender = gender;
        newDoctor.scheduleType = scheduleType;
        newDoctor.specialties = specialties;
        newDoctor.updatedAt = new Date().toString();
        // save the message
        newDoctor.save()
      .then((doctor) => {
        resolve(doctor);
      })
    });
  });
}


const doctorModel = mongoose.model('doctor', doctor);
module.exports = doctorModel;

