/* global */

const commonHandler = require("./route-common")
const express = require("express");
const router = express.Router();
const PatientController = require("../controllers/patientController");

//api to get all patients data
router.get("/", (req, res) => {
  commonHandler(PatientController.getPatient(), req, res);
});

//api to get a patient by id
router.get("/:id", (req, res) => {
  commonHandler(PatientController.getPatientById(req.params.id), req, res);
});

//api to create a patient
router.post("/", (req, res) => {
  commonHandler(PatientController.addPatient(req.body.firstName, req.body.lastName, req.body.gender, req.body.weight, req.body.height, req.body.origin, req.body.allergic), req, res);
});

module.exports = router;
