const mongoose = require("mongoose");
var Patient = require('../models/patient');

// get the list of patients
var getAllPatients = function(req, res) {
  Patient.find({}, function(err, docs) {
  if (err) 
    res.send({"ErrorCode":1,"Message":err});
  else
    res.send({"ErrorCode":0,"List of patients " :docs});
  });
}
// create new patient
var createPatient = function(req, res) {

// Create an instance of patient Model
var patient = Patient({
    _id: mongoose.Types.ObjectId(),
    name: {"firstName":req.body.firstName,"lastName":req.body.lastName},
    age: req.body.age,
    blood_group: req.body.blood_group,
    contact: req.body.contact,
    address: req.body.address,
    profilePicture: req.body.profilePicture,
    created_at: Date.now(),
    updated_at: Date.now(),
  });

// Save the new model instance, passing a callback
  patient.save(function (err) {
    if (err) 
      res.send({"ErrorCode":1,"Message":err});
    else
      res.send({"ErrorCode":0,"Message":"Patient created"});
  });
  
}

// find Patient by patient's firstName, age or by id
var findPatientByField = function(req, res) {
  if(req.body.firstName!="" && req.body.firstName ){
    Patient.find({ "name.firstName": req.body.firstName}, function(err, docs) {
      if (err)
        res.send({"ErrorCode":1,"Message":err});
      else           
        res.send({"ErrorCode":0,"Message":docs});
    });
  }
  else if(req.body.age!="" && req.body.age ){
    Patient.find({ "age": req.body.age}, function(err, docs) {
      if (err)
        res.send({"ErrorCode":1,"Message":err});
      else           
        res.send({"ErrorCode":0,"Message":docs});
    });
  }
  else if(req.body.id!="" && req.body.id ){
    Patient.find({ "_id": req.body.id}, function(err, docs) {
      if (err)
        res.send({"ErrorCode":1,"Message":err});
      else           
        res.send({"ErrorCode":0,"Message":docs});
    });
  }
    
}

// delete all the patients
var deleteAll =function(req, res){
  Patient.remove({}, function(err) {
    if (err)
      res.send({"ErrorCode":1,"Message":err})
    else           
      res.send({"ErrorCode":0,"Message":"All patients deleted successfully"});
  });
}

module.exports = {getAllPatients,createPatient,findPatientByField, deleteAll};