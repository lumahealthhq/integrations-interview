'use strict';

var mongoose = require('mongoose'),
    Doctor = mongoose.model('Doctors');

exports.list_all_doctors = (req, res) => {
    Doctor.find({}, (err, doc) => {
        err ? res.status(500).send({message: "Failed to get doctors information",error: err})
            : doc.length>0 ? res.status(200).json(doc) :res.status(204).send();
    });
};

exports.add_a_doctor = (req, res) => {
    var doctor = new Doctor(req.body);
    doctor.save((err, doc) => {
        err ? res.status(500).send({message: "Failed to add doctor information",error: err})
            : res.status(201).json(doc);
    });
};

exports.get_a_doctor = (req, res) => {
    Doctor.findById(req.params.docId, (err, doc) => {
        err ? (res.status(500).send({message: "Failed to get doctor information",error: err}))
            : (doc ? res.status(200).json(doc) : res.status(204).send());
    });
};

exports.update_a_doctor = (req, res) => {
    Doctor.findOneAndUpdate({_id: req.params.docId}, req.body, {upsert: true, new: true}, (err, doc) => {
        err ? res.status(500).send({message: "Failed to update doctor information",error: err})
            : res.status(200).json(doc);
    });
};


exports.delete_a_doctor = (req, res) => {
    Doctor.remove({_id:req.params.docId}, function(err, doc) {
        err ? res.status(500).send({message: "Failed to delete doctor information",error: err})
            : res.status(200).json({ message: 'Doctor successfully deleted' });
    });
};
