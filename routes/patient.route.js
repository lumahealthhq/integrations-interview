const router = require("express").Router();
const patients = require("../controllers/patient.controller");

// get list of all patient records and their appointments
router.get("/", patients.getPatients);

// create a new patient record
router.post("/", patients.createPatient);

// delete a patient record 
router.delete("/:patientName", patients.deletePatient);

// get details of a patient by patient name
router.get("/:patientName", patients.getPatientByName);

module.exports = router, patients;