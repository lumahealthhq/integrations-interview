const express = require('express');

var app = express();
var configs = require('./config.js');
const parser = require("body-parser");
app.use( parser.json() );
app.use(parser.urlencoded({
  extended: true
}));

var doctorHandler = require("./controller/doctor-controller.js");
var patientHandler = require("./controller/patient-controller.js");
var bookingHandler = require("./controller/booking-controller.js");

app.use('/doctors', doctorHandler);
app.use('/patients', patientHandler);
app.use('/bookings', bookingHandler);

app.listen(configs.server.PORT, () => {
    console.log("Starting to listen");
});
