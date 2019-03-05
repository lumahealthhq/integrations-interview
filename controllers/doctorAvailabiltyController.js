var { mongoose } = require('../db/mongoose');
var { Doctors } = require('../models/doctors');
var { Appointments } = require('../models/appointments');


module.exports.setAvailability = function (req, res) {



    Doctors.findOne({ "_id": req.body.id, "availability": { $elemMatch: { "date": req.body.date } } }, function (error, doctorDates) {
        if (error) {
        } else {

            if (!doctorDates) {
                let data = {
                    date: req.body.date,
                    startTime: req.body.startTime,
                    endTime: req.body.endTime
                }
                Doctors.updateOne({ "_id": req.body.id },
                    {
                        $push: { "availability": data }
                    },
                    function (error, doctors) {
                        if (error) {
                            res.status(403).json("Error in changing availability");
                        } else {
                            let data = {
                                success: 1,
                                message: "Availability added successfully"
                            }
                            res.status(200).json(data);
                        }
                    })
            } else {
                Doctors.updateOne(
                    { "_id": req.body.id, "availability.date": req.body.date },
                    {
                        $set: { "availability.$.startTime": req.body.startTime, "availability.$.endTime": req.body.endTime, }
                    },
                    function (error, response) {
                        if (error) {
                            res.status(403).json("Error in changing availability");
                            res.end();
                        } else {
                            let startTime = parseInt(req.body.startTime.replace(":", "."));
                            let endTime = parseInt(req.body.endTime.replace(":", "."));

                            Appointments.find(
                                { "doctorId": req.body.id, "appointmentDate": req.body.date },
                                function (error, appointment) {
                                    if (error) {
                                        res.status(403).json("Error in cancelling bookings");
                                        res.end();
                                    } else {
                                        if (appointment.length > 0) {
                                            var result = [];
                                            for (var i = 0; i < appointment.length; i++) {
                                                appointment[i].aStartTime = parseInt(appointment[i].aStartTime.replace(":", "."));
                                                appointment[i].aEndTime = parseInt(appointment[i].aEndTime.replace(":", "."));
                                                if (
                                                    (
                                                        (startTime > appointment[i].aStartTime || endTime < appointment[i].aEndTime)
                                                    )) {
                                                    result.push(appointment[i]);
                                                    Appointments.deleteOne({ "_id": appointment[i]._id }, function (req, response) {
                                                        if (error) {
                                                           
                                                        } else {
                                                            let data = {
                                                                success: 1,
                                                                message: "Availability changed successfully with some cancelled Bookings",
                                                                cancelled_Bookings: result
                                                            }
                                                            
                                                            res.status(200).json(data);
                                                            res.end();
                                                        }
                                                    });
                                                }
                                            }
                                        } else {
                                            let data = {
                                                success: 1,
                                                message: "Availability changed successfully",
                                            }
                                            res.status(200).json(data);
                                            res.end();
                                        }

                                    }
                                })
                        }

                    })
            }
        }
    })
}