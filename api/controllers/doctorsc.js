const Doctor = require('../models/Doctor');
const Appointment = require('../models/Appointment');
const mongoose = require('mongoose');

exports.doctors_get_all=(req, res)=>{
    Doctor.find()
        .exec()
        .then(docs=>{
            console.log(docs);
            const response = {
                count : docs.length,
                Doctors : docs.map(doc=>{
                    return{
                        id:doc._id,
                        name:doc.name,
                        address:doc.address,
                        availability:doc.availability,
                        request:{
                            type:'Get',
                            url:'http://localhost:3000/appointments/'+ doc._id
                        }
                    }
                })
            };
            res.status(200).json(response);
        })
        .catch(err=>{
            console.log(err);
            res.status(500).json({error:err});
        });
};

exports.doctors_post=(req, res)=>{
    const doctor=new Doctor(req.body);
    doctor._id = new mongoose.Types.ObjectId();
    console.log(doctor);
    doctor.save()
        .then(result=>{
            console.log(result);
            res.status(201).json({
                message : 'Doctor Created Successfully',
                CreatedDoctor:{
                    name : result.name,
                    address : result.address,
                    _id:result._id
                }
            });
        })
        .catch(err=> {
            console.log(err);
            res.status(500).json({error: err});
        });
};

exports.get_doctor_by_id=(req,res,next)=>{
    const id = req.params.doctorId;
    Doctor.findById(id).exec()
        .then(doc=>{
            console.log(doc);
            res.status(200).json(doc);
        })
        .catch(err=>{
            console.log(err);
            res.status(404).json({error:err});
        });
};

exports.delete_doctor=(req,res)=>{
    const id = req.params.doctorId;


    Appointment.deleteMany({doctor:id}).exec().then(resultf=>{
        const doctor = Doctor.remove({_id:id})
            .exec()
            .then(result=>{
                console.log(result);
                res.status(200).json(result);
            })
            .catch(err=>{
                console.log(err);
                res.status(500).json({error:err});
            });
    }).catch(err=>{
        console.log(err);
        res.status(500).json({error:err});
    });

};

exports.doctor_patch=(req,res)=>{
    const id = req.params.doctorId;
    Doctor.update({_id:id},req.body,{new:true})
        .exec()
        .then(result=>{
            console.log(result);
            res.status(200).json(result);
        })
        .catch(err=>{
            console.log(err);
            res.status(500).json({error:err});
        });
};