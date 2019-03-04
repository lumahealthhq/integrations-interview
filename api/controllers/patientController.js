'use strict';

var mongoose = require('mongoose'),
  Patients = mongoose.model('Patients');

exports.list_all_patients = (req, res) => {
  Patients.find({}, (err, patient) => {
    if(err)
      res.status(500).send({message: "Failed to get patients information",error: err});
    else{
       patient && patient.length>0 ? res.status(200).json(patient) : res.status(204).send();
    }
  });
};

exports.add_a_patient = (req, res) => {
  var new_patient = new Patients(req.body);
  new_patient.save((err, patient) => {
    err ? res.status(500).send({message: "Failed to add patient information",error: err}) : res.status(201).json(patient);
  });
};


exports.get_a_patient = (req, res) => {
  Patients.findOne({_id:req.params.patientId}, (err, patient) => {
    if(err)
      res.status(500).send({message: "Failed to get patient information",error: err});
    else{
       patient? res.status(200).json(patient) : res.status(204).send();
    }
  });
};


exports.update_a_patient = (req, res) => {
  Patients.findOneAndUpdate({_id: req.params.patientId}, req.body, {new: true}, (err, patient) => {
      err ? res.status(500).send({message: "Failed to update patient information",error: err}) : res.status(200).json(patient);
    }
  );
};


exports.delete_a_patient = (req, res) => {
  Patients.remove({
    _id: req.params.patientId
  }, (err, patient) => {
    err ? res.status(500).send({message: "Failed to delete patient information",error: err }) : res.status(200).json({ message: 'Patient successfully deleted' });
  });
};
