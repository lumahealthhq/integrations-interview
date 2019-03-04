const express = require("express");
const app = express();
const checker = require("./checker");
const BaseJoi = require("joi");
const Extension = require("joi-date-extensions");
const Joi = BaseJoi.extend(Extension);

app.use(express.json());

// this is for node.js module
exports.printMsg = function() {
  console.log("This is a message from the demo package");
};

const doctors = [];

// track doctor workingHours
app.get("/:name", (req, res) => {
  const doctor = doctors.find(d => d.name === req.params.name);
  if (!doctor) res.status(404).send("Doctor not found");
  res.send(doctor.workingHours);
});

//track booked appointments
app.get("/appointments/:name", (req, res) => {
  const doctor = doctors.find(d => d.name === req.params.name);
  if (!doctor) res.status(404).send("Doctor not found");
  res.send(doctor.appointments);
});

// create a doctor working hours
app.post("/workingHours", (req, res) => {
  //validate the import doctor data
  if (!checker.checkValidDoctor(req.body)) {
    res.status(404).send("Invalid data");
    return;
  }
  // update or create a doctor working hours
  const input = ({ name = "", workingHours = "" } = req.body);
  input.appointments = [];
  // if there is not such doctor, add this doctors
  // if there is already this doctor, update his or her workingHours
  const doctor = doctors.find(d => d.name === input.name);
  if (!doctor) {
    doctors.push(input);
    res.send(input).send("Woking hour added");
  } else {
    doctor.workingHours = input.workingHours;
    res.send(input).send("Working hour updated");
  }
});

// book a doctor opening
app.post("/appointments", (req, res) => {
  if (!checker.checkValidAppointments(req.body)) {
    res.status(404).send("Invalid input");
  }
  //create a new appointment
  const input = ({
    patientName = "",
    doctorName = "",
    appointDate = "",
    appointTime = ""
  } = req.body);
  //check whether overlap with an existing appointment
  const doctor = doctors.find(d => d.name === req.body.doctorName);
  if (!doctor) {
    res.status(404).send("Doctor not found");
    return;
  }
  //check whether overlap with an existing appointment
  const appointments = doctor.appointments;
  if (!checker.isWork(input, doctor.workingHours)) {
    res.send("Doctor not working at this time");
    return;
  }
  if (!checker.isOverLap(input, appointments)) {
    appointments.push(input);
    res.send(input);
  } else {
    res.send("Not an opening");
  }
});

const port = process.env.PORT || 5000;
app.listen(port, () => console.log("Listening on port ${port}"));

module.exports = app;
