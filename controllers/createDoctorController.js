var { mongoose } = require('../db/mongoose');
var { Doctors } = require('../models/doctors');

module.exports.createDoctor = function (req, res) {

    var doctor = new Doctors({
        firstName : req.body.firstName,
        lastName : req.body.lastName,
        email : req.body.email,
        phoneNumber :req.body.phoneNumber
    })

    Doctors.find({ email: req.body.email }, function (error, doctors) {
        if (error) {
            res.status(403).json({
                success: 0,
                message: "Error in creating Doctors."
            })
            res.end();
        } else {
            if (doctors.length > 0) {
                let data = {
                    success: 0,
                    message: "Doctor already registered"
                }
                res.status(200).json(data);
                res.end();
            } else {
                doctor.save().then((doctors) => {
                    let data = {
                        success: 1,
                        message: "Doctor added successfully"
                    }
                    res.status(200).json(data);
                    res.end();
                }) 
            }
        }
        
    })
}