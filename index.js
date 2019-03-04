const express = require("express");
const app = express();
const checker = require("./checker");

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
