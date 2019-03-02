const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Booking = require('../models/bookingModel');


router.patch('/update/:docid', (req, res, next)=> {
    const docid = req.params.docid;
    const updateOps ={};
    for(const ops of req.body){
        updateOps[ops.propName] = ops.value;
    }
    Booking.update({docid:docid},{
        $set:updateOps
    }).exec().then(result => {
        console.log(result);
        res.status(200).json(result);
    }).catch(err=>{
        console.log(err);
        res.status(500).json({
            error:err
        })
    })


});

router.post('/create/:docid', (req, res, next)=> {
    const docHour ={
        docid:req.body.docid,
        docname: req.body.docName,
        date: req.body.date
    };
    res.status(201).json({
        message: 'create list',
        hours: docHour
    });
});

module.exports = router;
