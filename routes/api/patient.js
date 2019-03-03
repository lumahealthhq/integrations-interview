const express = require("express");
const router = express.Router();

const Patient = require("../../models/Patient");

// @route   POST api/patient
// @desc    Create a patient
router.post("/", (req, res) => {
  const { name } = req.body;

  new Patient({ name })
    .save()
    .then(patient => res.json(patient))
    .catch(err => res.status(404).json(err));
});

// @route   GET api/patient/all
// @desc    Get all patients
router.get("/all", (req, res) => {
  Patient.find()
    .then(patients => res.json(patients))
    .catch(err => res.status(404).json({ msg: "No patients found" }));
});

module.exports = router;
