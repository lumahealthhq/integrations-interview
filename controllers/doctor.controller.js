const Doctor = require('../models/doctor.model');
const Opening = require('../models/opening.model');

// get list of all doctors
exports.getDoctors = function (req, res, next) {
  Doctor.find({}, function (err, doctors) {
    if (err) {
      return next(err);
    }
    res.status(200).send(doctors);
  })
};

// create new doctor record
exports.createDoctor = function (req, res, next) {
  if (req.is('application/json')) {
    let doctor = new Doctor({
      name: req.body.name,
      working_hours: req.body.working_hours
    });

    doctor.save(function (err) {
      if (err) {
        return next(err);
      }
      res.status(201).send('Doctor record created successfully.')
    });
  } else {
    res.status(400).send();    
  }
};

// get details about a doctor
exports.getDoctorByName = function (req, res, next) {
  Doctor.find({ name: req.params.doctorName }, function (err, doctor) {
    if (err) {
      return next(err);
    }
    res.send(doctor);
  })
};

// update working hours of the given doctor 
exports.updateDoctorHoursByName = function (req, res, next) {
  if (req.is('application/json')) {
    Doctor.findOne({ name: req.params.doctorName }, function (err, doctor) {
      if (err) {
        return next(err);
      }

      doctor['working_hours'].forEach((tmp) => {
        if (tmp.day === req.body.day) {
          tmp.hours_from = req.body.hours_from;
          tmp.hours_to = req.body.hours_to;
        }
      });

      doctor.save(function (err) {
        if (err) {
          return next(err);

        }
        res.send('Working hours successfully updated.');
      });
    });    
  } else {
    res.status(400).send();    
  }
};

// delete doctor record by given name
exports.deleteDoctor = function (req, res, next) {
  Doctor.deleteMany({ name: req.params.doctorName }, function (err) {
    if (err) {
      return next(err);
    }
    res.status(200).send("Doctor record successfully removed.");
  })
}