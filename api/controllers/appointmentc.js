const Appointment = require('../models/Appointment');
const mongoose = require('mongoose');

exports.get_all_appointments = (req, res)=>{
    Appointment.find()
        .populate('doctor','name')
        .populate('patient','name')
        .exec()
        .then(docs=>{
            console.log(docs);
            res.status(200).json(docs);
        })
        .catch(err=>{
            console.log(err);
            res.status(500).json({error:err});
        });
};

exports.appointment_post = (req, res)=>{
    Appointment
        .find({doctor:req.body.doctor,patient:req.body.patient,date:req.body.date,slot:req.body.slot})
        .then(result=>{
            if(result.length>0){
                console.log(result);
                res.status(200).json({message:'Appointment is Already booked'});
            }else{
                const appointment=new Appointment(req.body);
                appointment._id = new mongoose.Types.ObjectId();
                appointment.save()
                    .then(result=>{
                        console.log(result);
                        res.status(201).json({
                            message : 'Appointment Created Successfully',
                            _id:result._id,
                            CreatedAppointment:{
                                doctor:result.doctor,
                                patient:result.patient,
                                date:result.date,
                                slot:result.slot
                            }
                        });
                    })
                    .catch(err=> {
                        console.log(err);
                        res.status(500).json({error: err});
                    });
                console.log("not found");
            }
        })
        .catch(err=> {
            console.log(err);
            res.status(500).json({error: err});
        });
};

exports.appointment_delete = (req,res)=>{
    const id = req.params.appointmentId;
    Appointment.remove({_id:id})
        .exec()
        .then(result=>{
            console.log(result);
            res.status(200).json({message:'Appointment Canceled'});
        })
        .catch(err=>{
            console.log(err);
            res.status(500).json({error:err});
        });

};

exports.get_appointment_by_patientid = (req, res)=>{
    //const id = req.params.patientId;
    Appointment.find({patient:req.params.patientId})
        .exec()
        .then(docs=>{
            console.log(docs);
            res.status(200).json(docs);
        })
        .catch(err=>{
            console.log(err);
            res.status(500).json({error:err});
        });
};

exports.get_appointment_by_doctorid = (req, res)=>{
    //const id = req.params.patientId;
    Appointment.find({doctor:req.params.doctorId})
        .exec()
        .then(docs=>{
            console.log(docs);
            res.status(200).json(docs);
        })
        .catch(err=>{
            console.log(err);
            res.status(500).json({error:err});
        });
};