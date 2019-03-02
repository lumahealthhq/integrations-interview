const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Booking = require('../models/bookingModel');

router.get('/:docid', (req, res, next)=> {

    const docid = req.params.docid;
    Booking.findOne({docid:docid})
        .exec()
        .then(doc => {
            console.log(doc);
            if(doc){
                res.status(200).json({
                    docid:doc.docid,
                    date: doc.date,
                    startTime: doc.startTime,
                    endTime: doc.endTime
                });
            }else{
                res.status(404).json({message:'No valid entry found for this docId'});
            }

        })
        .catch(err => {
            console.log(err);
            res.status(500).json({error : err});
        });
});

router.post('/:docid/:patientid/:date/:time', (req, res, next)=> {
    const booking = new Booking({
        _id: new mongoose.Types.ObjectId(),
        _id: req.params.docid,
        patientId: req.params.patientid,
        date: req.params.date,
        startTime: req.params.time,
        endTime: req.params.time
    });
    booking.save().then(result =>{
        console.log(result);
        res.status(201).json({
        message: 'handling POST request with workinghours',
        createdRecord: booking
    });
    }).catch(err => {
        console.log(err);
        res.status(500).json({
            error:err
        });
    });

});

module.exports = router;
