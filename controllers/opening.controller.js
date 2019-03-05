const Opening = require('../models/opening.model');
const Patient = require('../models/patient.model');
const Doctor = require('../models/doctor.model');

// get a list of available openings for patients to book
exports.getOpenings = function (req, res, next) {
  Opening.find({}, function (err, openings) {
    if (err) {
      return next(err);
    }
    res.send(openings);
  })
};

// post a new opening
exports.postOpening = function (req, res, next) {
  if (req.body.month === undefined || req.body.day === undefined || req.body.year === undefined ||
      req.body.doctor_name === undefined) {
    return next("Missing body parameters.");
  } else {
    var mDate = req.body.month + "/" + req.body.day + "/" + req.body.year;

    let opening = new Opening({
      doctor_name: req.body.doctor_name,
      date: mDate
    });  

    opening.save(function (err) {
      if (err) {
        return next(err);
      }
      res.status(201).send("Opening created successfully.");
    });
  }
} 

// delete an existing opening 
exports.deleteOpening = function (req, res, next) {
  if (req.body.month === undefined || req.body.day === undefined || req.body.year === undefined ||
      req.body.doctor_name === undefined) {
    return next("Missing body parameters.");
  } else {
    var mDate = req.body.month + "/" + req.body.day + "/" + req.body.year;
    Opening.deleteMany({ doctor_name: req.body.doctor_name, date: mDate }, function (err) {
      if (err) {
        console.log("hi")
        return next(err);
      }
      res.status(200).send("Opening successfully removed.");
    })
  }
}

// book an available opening
exports.bookOpening = function (req, res, next) {
  if (req.body.month === undefined || req.body.day === undefined || req.body.year === undefined ||
      req.body.patient_name === undefined || req.body.doctor_name === undefined) {
    return next("Missing body parameters.");
  } else {
    var mDate = req.body.month + "/" + req.body.day + "/" + req.body.year;

    findOpening(req.body.doctor_name, mDate, function (response) {
      if (response === null) {
        res.send("This opening does not exist. Try booking another one.");
      } else {
        // search for the patient and add to his/her list of appointments
        Patient.findOne({ name: req.body.patient_name }, function (err, patient) {
          if (err) {
            return next(err);
          }

          if (patient === null) {
            res.status(404).send("This patient does not exist. Create new patient record and try again.");
          } else {
            patient['appointments'].push(response);
            patient.save(function (err) {
              if (err) {
                return next(err);
              }
            });            
            res.status(200).send("Appointment successfully booked.");
          }
        });
      }
    });
  }
}

// helper function to find the opening associated with given doctor name and date
function findOpening(doctorName, mDate, cb) {
  Opening.findOne({ doctor_name: doctorName, date: mDate }, function (err, opening) {
    if (err) {
      return next(err);
    }
    return cb(opening);
  })
}