const Doctor = require('../models').Doctor;
const Availability = require('../models').DoctorAvailability;
const Appointment = require('../models').Appointment;
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

module.exports = {
    bookAppointment(req, res) 
    {
      // check patient conflict
      // TODO - fails if the given stime/etime encompasses the patients starttime/endtime
      Appointment
        .findAll({
            where: 
            {
                patient_id: req.body.patientId,
                appt_date: req.body.apptDate,
                [Op.or]: 
                [
                    {
                        start_time: {
                            [Op.or]: [{[Op.eq]: req.body.stime}, {[Op.notBetween]: [req.body.stime, req.body.etime]}]
                        }
                    },
                    {
                        end_time: {
                            [Op.or]: [{[Op.eq]: req.body.etime}, {[Op.notBetween]: [req.body.stime, req.body.etime]}]                    
                        }
                    }
                ]                
            }
        })
        .then(patientConflict => {
            //console.log("patientConflict: %o", patientConflict)
            if(patientConflict.length > 0)
            {
                res.status(200).send("Error - Appointment already exists for this patient");
            }
            else
            {
                // check doctor availability
                Availability
                .findAll({
                    where:
                    {
                        doctor_id: req.body.doctorId,
                        avail_date: req.body.apptDate,
                        start_time: {
                            [Op.and]: [{[Op.lte]: req.body.stime}, {[Op.lt]: req.body.etime}]
                        },
                        end_time: {
                            [Op.and]: [{[Op.gte]: req.body.etime}, {[Op.gt]: req.body.stime}]                    
                        }
                    }
                })
                .then(availConflict => {
                    //console.log("availConflict: %o", availConflict)                
                    if(availConflict.length == 0)
                    {
                        res.status(200).send("Error - Doctor unavailable");
                    }
                    else 
                    {
                        // check doctor appointment conflict
                        Appointment
                        .findAll({
                            where: 
                            {
                                doctor_id: req.body.doctorId,
                                appt_date: req.body.apptDate,
                                [Op.or]: 
                                [
                                    {
                                        start_time: {
                                            [Op.or]: [{[Op.eq]: req.body.stime}, {[Op.notBetween]: [req.body.stime, req.body.etime]}]
                                        }
                                    },
                                    {
                                        end_time: {
                                            [Op.or]: [{[Op.eq]: req.body.etime}, {[Op.notBetween]: [req.body.stime, req.body.etime]}]                    
                                        }
                                    }
                                ]
                            }
                        })
                        .then(doctorConflict => {
                            console.log("doctorConflict: %o", doctorConflict)                
                            if(doctorConflict.length > 0)
                            {
                                res.status(200).send("Error - Doctor has an conflicting appointment");
                            }
                            else 
                            {
                                Appointment
                                .create({
                                  patient_id: req.body.patientId,
                                  doctor_id: req.body.doctorId,
                                  appt_date:  req.body.apptDate,
                                  start_time: req.body.stime, 
                                  end_time: req.body.etime, 
                                  duration: 60
                                })
                                .then(appt => res.status(201).send(appt))
                                .catch(error => res.status(400).send(error));
                            }
                        })
                        .catch(error => res.status(400).send(error));
                    }
                })
                .catch(error => res.status(400).send(error));
            }              
        })       
        .catch(error => res.status(400).send(error));
    },
    getAllAppointments(req, res) 
    {
      return Appointment
        .findAll()
        .then(appointments => res.status(200).send(appointments))
        .catch(error => res.status(400).send(error));
    },
    getAllAppointmentsPerDate(req, res) 
    {
      return Appointment
        .findAll({
            where: {
                appt_date: req.params.date
            }
        })
        .then(appointments => res.status(200).send(appointments))
        .catch(error => res.status(400).send(error));
    }
  }; 