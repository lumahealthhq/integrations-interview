const Doctor = require('../models').Doctor;
const Availability = require('../models').DoctorAvailability;
const Appointment = require('../models').Appointment;
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

module.exports = {
    bookAppointment(req, res) 
    {
      // check patient conflict
      Appointment
        .findAll({
            where: 
            {
                patient_id: req.body.patientId,
                appt_date: req.body.apptDate         
            }
        })
        .then(patientConflict => {
            //console.log("patientConflict: %o", patientConflict)
            let isPatientConflict = false;
            for(var i =0; i < patientConflict.length; i++)
            {
                var patient = patientConflict[i];
                if((req.body.stime >= patient.start_time && req.body.stime < patient.end_time) 
                || (req.body.etime > patient.start_time && req.body.etime <= patient.end_time))
                {
                    isPatientConflict = true;                    
                    res.status(200).send("Error - Appointment already exists for this patient");  
                    break;                      
                }
            }           
            if(!isPatientConflict)
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
                                appt_date: req.body.apptDate
                            }
                        })
                        .then(doctorConflict => {
                            console.log("doctorConflict: %o", doctorConflict)
                            let isApptConflict = false; 
                            
                            for(var i =0; i < doctorConflict.length; i++)
                            {
                                var doctorAppt = doctorConflict[i];
                                if((req.body.stime >= doctorAppt.start_time && req.body.stime < doctorAppt.end_time) 
                                || (req.body.etime > doctorAppt.start_time && req.body.etime <= doctorAppt.end_time))
                                {
                                    isApptConflict = true
                                    res.status(200).send("Error - Doctor has an conflicting appointment");
                                    break;                      
                                }
                            }
                            if(!isApptConflict) 
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