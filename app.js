"use strict";

// external dependencies
const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const path = require('path');
const fs = require('fs');

//internal dependencies
const dbConnector = require("./utils/dbConnector");
const dbConfig = require("./config/dbConfig")[process.env.DB || "test"];
const connector = new dbConnector(dbConfig.location, dbConfig.username, dbConfig.dbName);
const scheduleRoutes = require("./routes/schedule");
const doctorRoutes = require("./routes/doctor");
const patientRoutes = require("./routes/patient");
const appointmentRoutes = require("./routes/appointment");



app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//global connection
global.dbConnector = dbConnector.dbConnection;
global.ScheduleModel = require("./models/schedule");
global.DoctorModel = require("./models/doctor");
global.PatientModel = require("./models/patient");
global.AppointmentModel = require("./models/appointment");



//use services
app.use("/schedule", scheduleRoutes);
app.use("/doctor", doctorRoutes);
app.use("/patient", patientRoutes);
app.use("/appointment", appointmentRoutes);

app.get('/', (req, res) => {
  res.end('Hello LumaHealth!');
});

//create app server
let server = app.listen(3000,  "localhost", () => {

  let host = server.address().address
  let port = server.address().port

  console.log(`Listening at http://${host}:${port}`)

});