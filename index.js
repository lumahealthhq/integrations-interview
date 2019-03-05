var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var cors = require('cors');
const fs = require('fs');

app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
module.exports = app;

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

var doctorController =require('./controllers/doctorAvailabiltyController');
var listOfDoctorsController = require('./controllers/listOfDoctorsController');
var getDoctorHoursController = require('./controllers/getDoctorHoursController');
var bookAppointmentController = require('./controllers/bookAppointmentController');
var createDoctorController = require('./controllers/createDoctorController');
var createPatientController = require('./controllers/createPatientController');

//Allow Access Control
app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Authorization, Content-Type, Accept, Access-Control-Request-Method, Access-Control-Request-Headers');
    res.setHeader('Cache-Control', 'no-cache');
    next();
  });

app.post('/doctoravailability',doctorController.setAvailability);
app.post('/list_of_doctors',listOfDoctorsController.listOfDoctors);
app.get('/get_doctors_hours/:id/:date',getDoctorHoursController.getDoctorHours);
app.post('/book_appointment', bookAppointmentController.bookAppointment);
app.post('/createdoctor', createDoctorController.createDoctor);
app.post('/createpatient', createPatientController.createPatients);
  
app.listen(3001);
console.log("server started on port 3001")