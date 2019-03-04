'use strict';

var mongoose = require('mongoose'),
  Doctor = mongoose.model('Doctors');

exports.list_all_doctors = (req, res) => {
  Doctor.find({}, (err, doctor) => {
    if(err)
      res.status(500).send({message: "Failed to get doctors information",error: err});
    else{
      doctor.length>0 ? res.status(200).json(doctor) :res.status(204).send();
    }
  });
};

exports.add_a_doctor = (req, res) => {
  var new_doctor = new Doctor(req.body);
  new_doctor.save((err, doctor) => {
    err ? res.status(500).send({message: "Failed to add doctor information",error: err}) : res.status(201).json(doctor);
  });
};


exports.get_a_doctor = (req, res) => {
  Doctor.findById(req.params.docId, (err, doctor) => {
    if(err)
      res.status(500).send({message: "Failed to get doctor information",error: err});
    else{
      doctor ? res.status(200).json(doctor) : res.status(204).send();
    }
  });
};


exports.update_a_doctor = (req, res) => {
  Doctor.findOneAndUpdate({_id: req.params.docId}, req.body, {new: true}, (err, doctor) => {
    err ? res.status(500).send({message: "Failed to update doctor information",error: err}) : res.status(200).json(doctor);
  });
};


exports.delete_a_doctor = (req, res) => {
  Doctor.remove({_id:req.params.docId}, function(err, doctor) {
    err ? res.status(500).send({message: "Failed to delete doctor information",error: err}) : res.status(200).json({ message: 'Doctor successfully deleted' });
  });
};
