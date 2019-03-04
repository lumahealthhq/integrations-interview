/* global */

const commonHandler = require("./route-common")
const express = require("express");
const router = express.Router();
const AppointmentController = require("../controllers/appointmentController");

//api to get all appointments data
router.get("/", (req, res) => {
  commonHandler(AppointmentController.getAppointments(req.query.current), req, res);
})

//Get doctor's upcoming appointments (patient's id can be specified)
router.get("/doctorAppointments", (req, res) => {
  commonHandler(AppointmentController.getDoctorAppointments(req.query.doctorId, req.query.patientId, req.query.current), req, res);
})

//Get patient's upcoming appointments (doctor's id can be specified)
router.get("/patientAppointments", (req, res) => {
  commonHandler(AppointmentController.getPatientAppointments(req.query.patientId, req.query.doctorId, req.query.current), req, res);
})

//Get doctor's total workhours
router.get("/workhour", (req, res) => {
  commonHandler(AppointmentController.getWorkHour(req.query.doctorId, req.query.start, req.query.end), req, res);
})

//Get doctor's free schedule
router.get("/freeSchedule", (req, res) => {
  commonHandler(AppointmentController.findFreeSchedule(req.query.doctorId, req.query.start, req.query.end), req, res);
})

//Create an appointment
router.post("/", (req, res) => {
  commonHandler(AppointmentController.addAppointment(req.body.details, req.body.assistant, req.body.start, req.body.minutes, req.body.parrent), req, res);
});

//Update an appointment
router.post("/updateAppointment", (req, res) => {
  commonHandler(AppointmentController.updateAppointment(req.body.id, req.body.details, req.body.assistant, req.body.start, req.body.minutes, req.body.end, req.body.diagnose, req.body.parrent, req.body.cancel), req, res);
});

module.exports = router;
