const Patient = require('../models/Patient');
const mongoose = require('mongoose');

exports.patient_post = (req, res)=>{
    const patient=new Patient(req.body);
    patient._id = new mongoose.Types.ObjectId();
    console.log(patient);
    patient.save()
        .then(result=>{
            console.log(result);
            res.status(201).json({
                message : 'Patient Created Successfully',
                CreatedPatient:{
                    _id:result._id,
                    name : result.name
                }
            });
        })
        .catch(err=> {
            console.log(err);
            res.status(500).json({error: err});
        });
};

exports.get_all_patients = (req, res)=>{
    const patient = Patient.find()
        .exec()
        .then(docs=>{
            console.log(docs);
            const response = {       //response with count
                count : docs.length,
                patients : docs.map(doc=>{
                    return{
                        name:doc.name,
                        _id:doc._id,
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
