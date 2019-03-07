const controller = require('../Controllers/appointmentSchedulerController');
const express = require('express');
const router = express.Router();


// CREATE
    router.post('/AddDoctor', function (req, res, next){
        // middleware
        console.log(`Request from: ${req.originalUrl}`)
        console.log(`Request type: ${req.method}`)
        next();
    }, controller.addNewDoctor)

// API

    router.get('/getWorkingHoursDoctor/:Email', function(req, res, next){
        // middleware
        console.log(`Request from: ${req.originalUrl}`)
        console.log(`Request type: ${req.method}`)
        next();
    }, controller.getWorkingHoursDoctor);

    
    router.post('/bookWorkingHoursDoctor', function(req, res, next) {
        // middleware
        console.log(`Request from: ${req.originalUrl}`)
        console.log(`Request type: ${req.method}`)
        next();
    }, controller.bookDoctorOpening);  
    
    
    router.post('/createUpdateWorkingHoursDoctor', function(req, res, next) {
        // middleware
        console.log(`Request from: ${req.originalUrl}`)
        console.log(`Request type: ${req.method}`)
        next();
    }, controller.createUpdateWorkingHoursDoctor);

module.exports = router;