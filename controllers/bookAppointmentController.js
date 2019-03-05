var { mongoose } = require('../db/mongoose');
var { Doctors } = require('../models/doctors');
var { Patients } = require('../models/patients');
var { Appointments } = require('../models/appointments');

module.exports.bookAppointment = function (req, res) {
    let startTime =parseInt(req.body.startTime.replace(":", "."));
    let endTime = parseInt(req.body.endTime.replace(":", "."));
    
    Doctors.findOne( {"_id" : req.body.doctorId , "availability": { $elemMatch: { "date": req.body.date }}},{_id:0,availability:{$elemMatch:{"date": req.body.date }}} , function (error,doctorsTime){
        
        if(doctorsTime && doctorsTime.availability.length>0){

            let doctorStartTime=parseInt(doctorsTime.availability[0].startTime.replace(":","."));
            let doctorEndTime=parseInt(doctorsTime.availability[0].endTime.replace(":","."));

            
            if(startTime>=doctorStartTime && endTime<=doctorEndTime){

                Appointments.find(
                    { "doctorId": req.body.doctorId, "appointmentDate": req.body.date },
                    function (error, appointment) {
                        if (error) {
                            res.status(403).json("Error in booking doctor's availability");
                        } else {
                            if (appointment.length > 0) {
                                let notFound = true;
                                for (var i = 0; i < appointment.length; i++) {
                                    appointment[i].aStartTime = parseInt(appointment[i].aStartTime.replace(":", "."));
                                    appointment[i].aEndTime = parseInt(appointment[i].aEndTime.replace(":", "."));
                                    if (!
                                        (
                                            (startTime < appointment[i].aStartTime && endTime <= appointment[i].aStartTime)
                                            ||
                                            (appointment[i].aEndTime <= startTime && appointment[i].aEndTime < endTime)
                                        )) {
                                        notFound = false;
                                        res.status(200).json({
                                            success: 0,
                                            message: "Time slot already booked."
                                        })
                                        break;
                                    }
                                }
                                if (notFound) {
                                    var appointment = new Appointments
                                        ({
                                            "doctorId": req.body.doctorId,
                                            "patientId": req.body.patientId,
                                            "appointmentDate": req.body.date,
                                            "aStartTime": req.body.startTime,
                                            "aEndTime": req.body.endTime
                                        })
            
                                    appointment.save().then((appointments) => {
                                        let data = {
                                            success: 1,
                                            message: "Appointment booked successfully"
                                        }
                                        res.status(200).json(data);
                                    })
                                }
                            } else {
                                var appointment = new Appointments
                                    ({
                                        "doctorId": req.body.doctorId,
                                        "patientId": req.body.patientId,
                                        "appointmentDate": req.body.date,
                                        "aStartTime": req.body.startTime,
                                        "aEndTime": req.body.endTime
                                    })
            
                                appointment.save().then((appointments) => {
                                    let data = {
                                        success: 1,
                                        message: "Appointment booked successfully"
                                    }
                                    res.status(200).json(data);
                                })
                            }
                        }
            
                    })
            }else{
                res.status(200).json("Doctor is not available at this time");
            }

        }else{
            res.status(200).json("Doctor is not available at this date");
        }

    
    })
}
