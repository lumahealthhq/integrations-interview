var { mongoose } = require('../db/mongoose');
var { Patients } = require('../models/patients');

module.exports.createPatients = function (req, res) {

    var patient = new Patients({
        firstName : req.body.firstName,
        lastName : req.body.lastName,
        email : req.body.email,
    })

    Patients.find({ email: req.body.email }, function (error, patients) {
        if (error) {
            res.status(403).json({
                success: 0,
                message: "Error in creating Patient"
            })
            res.end();
        } else {
            if (patients.length > 0) {
                let data = {
                    success: 0,
                    message: "Patient already registered"
                }
                res.status(200).json(data);
                res.end();
            } else {
                patient.save().then((patients) => {
                    let data = {
                        success: 1,
                        message: "Patient added successfully"
                    }
                    res.status(200).json(data);
                    res.end();
                }) 
            }
        }
        
    })
}