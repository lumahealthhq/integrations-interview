const Patient = require('../models/patient.model');

// get list of all patients
exports.getPatients = function (req, res, next) {
  Patient.find({}, function (err, patients) {
    if (err) {
      return next(err);
    }
    res.send(patients);
  })
};

// create new patient record
exports.createPatient = function (req, res, next) {
  if (req.is('application/json')) {
    let patient = new Patient({
      name: req.body.name,
      appointments: req.body.appointments
    });

    patient.save(function (err) {
      if (err) {
        return next(err);
      }
      res.status(201).send('Patient record created successfully.')
    });  
  } else {
    res.status(400).send();  
  }
};

// get the details of a patient by id
exports.getPatientByName = function (req, res, next) {
  Patient.findOne({ name: req.params.patientName }, function (err, patient) {
    if (err) {
      return next(err);
    }
    res.send(patient);
  })
};

// delete patient record
exports.deletePatient = function (req, res, next) {
  Patient.deleteMany({ name: req.params.patientName }, function (err, patient) {
    console.log(patient);
    if (err) {
      return next(err);
    }
    res.send("Patient record successfully removed.");
  })
}