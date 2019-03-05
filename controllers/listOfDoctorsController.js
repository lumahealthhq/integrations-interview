var { mongoose } = require('../db/mongoose');
var { Doctors } = require('../models/doctors');

module.exports.listOfDoctors = function (req, res) {

    Doctors.find({}, function (error, doctors) {
        if (error) {
           res.status(403).json({
                success: 0,
                message: "Error in listing Doctors."
            })
        } else {
             let data = {
                success: 1,
                info: doctors
            }
            res.status(200).json(data);
          
        }
        res.end();
    })
}