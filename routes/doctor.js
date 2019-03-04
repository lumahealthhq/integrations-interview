/* global */

const commonHandler = require("./route-common")
const express = require("express");
const router = express.Router();
const DoctorController = require("../controllers/doctorController");

//api to get all doctors data
router.get("/", (req, res) => {
  commonHandler(DoctorController.getDoctor(), req, res);
});

//api to get a doctor by id
router.get("/:id", (req, res) => {
  commonHandler(DoctorController.getDoctorById(req.params.id), req, res);
});

//api to create a doctor
router.post("/", (req, res) => {
  commonHandler(DoctorController.addDoctor(req.body.firstName, req.body.lastName, req.body.gender, req.body.scheduleType, req.body.specialties), req, res);
});

module.exports = router;
