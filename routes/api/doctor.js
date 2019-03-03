const express = require("express");
const router = express.Router();

const Doctor = require("../../models/Doctor");

// @route   POST api/doctor
// @desc    Create a doctor
router.post("/", (req, res) => {
  const { name } = req.body;

  new Doctor({ name })
    .save()
    .then(doctor => res.json(doctor))
    .catch(err => res.status(404).json(err));
});

// @route   GET api/doctor/all
// @desc    Get all doctors
router.get("/all", (req, res) => {
  Doctor.find()
    .then(doctors => res.json(doctors))
    .catch(err => res.status(404).json({ msg: "No patients found" }));
});

// @route   GET api/doctor/hours/:doctor_id
// @desc    Find a doctor's working hours
router.get("/hours/:doctor_id", (req, res) => {
  Doctor.findById(req.params.doctor_id)
    .then(doctor => res.json(doctor.workinghours))
    .catch(err => res.status(404).json({ error: "No doctor found" }));
});

// @route   POST api/doctor/workinghours
// @desc    Create and update doctor's working hours
router.post("/workinghours", (req, res) => {
  const { doctor_id, date, from, to } = req.body;

  Doctor.findById(doctor_id)
    .then(doctor => {
      const found = doctor.workinghours.find(item => item.date === date);

      // if date already exists, update the work hours
      if (found !== undefined) {
        const removeIndex = doctor.workinghours
          .map(item => item._id)
          .indexOf(found._id);
        doctor.workinghours.splice(removeIndex, 1);
      }

      doctor.workinghours.push({ date, from, to });
      doctor.save().then(doctor => res.json(doctor));
    })
    .catch(err => res.status(404).json({ error: "No doctor found" }));
});

module.exports = router;
