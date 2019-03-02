const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Booking = require('../models/bookingModel');

const DocHours = require('../models/docHoursModel');

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




module.exports = router;
