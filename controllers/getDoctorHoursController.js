var { mongoose } = require('../db/mongoose');
var { Doctors } = require('../models/doctors');

module.exports.getDoctorHours = function (req, res) {

    Doctors.find({ "_id" : req.params.id , "availability" : { $elemMatch : { "date" : req.params.date }}},{_id: 0 ,availability : 1}, function (error, doctors) {
        if (error) {
           res.status(403).json({
                success: 0,
                message: "Error in listing Doctors Available hours."
            })
        } else {
            if (Object.keys(doctors).length != 0){
                let data = {
                    success: 1,
                    info: doctors
                }
                res.status(200).json(data);
            }else{
                let data = {
                    success: 1,
                    info: []
                }
                res.status(200).json(data);
            }
        }
        res.end();

})
}