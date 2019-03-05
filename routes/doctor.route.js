const router = require("express").Router();
var doctors = require("../controllers/doctor.controller");

// get list of all doctors and their working hours
router.get("/", doctors.getDoctors);

// create a new doctor record
router.post("/", doctors.createDoctor);

// get details of a doctor by doctor name
router.get("/:doctorName", doctors.getDoctorByName);

// delete a doctor record 
router.delete("/:doctorName", doctors.deleteDoctor);

// update working hours (day, hour, minute) of a doctor by doctor name
router.put("/:doctorName", doctors.updateDoctorHoursByName);

module.exports = router;