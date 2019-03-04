const router = require('express').Router();
const mongoose = require('mongoose');

const Workinghour = require('../models/workinghour');
const Doctor = require('../models/doctor');
const config = require('../config.json');

mongoose.connect(config.DB_URI, {user: config.USERNAME, pass: config.PASSWORD, useNewUrlParser: true});

//The API for creating a doctor's working hours
router.post('/:doctorId/create/', async (req, res) => {
    let doctorId = req.params.doctorId;
    let date = req.body.date;
    let duration = req.body.duration;
    let status = "free";

    if (!doctorId || !date || !duration) {
        return res.status(400).json({ error: 'Invalid parameter' });
    };
    if (duration < 0 || duration > 23) {
        return res.status(400).json({ error: 'Invalid duration.' });
    }

    let doctorExist = await Doctor.countDocuments({doctorId: doctorId});
    if (!doctorExist) {
        return res.status(404).json({error: 'There is no such doctor'});
    }

    let hourExist = await Workinghour.countDocuments({doctorId: doctorId, date: date, duration: duration});
    if (hourExist) {
        return res.status(409).json({error: 'The duration is already exist'});
    }

    await Workinghour.create({
        doctorId: doctorId,
        date: date,
        duration: duration,
        status: status
    }, (err, result) => {
        if (err) {
            return res.status(500).json({error: 'Some issue happens between server and databse.'});
        }
    });
    res.send();


});

//The API for deleting doctor's working hour
router.delete('/:doctorId/delete/', async (req, res) => {
    let doctorId = req.params.doctorId;
    let date = req.body.date;
    let duration = req.body.duration;

    if (!doctorId || !date || !duration) {
        return res.status(400).json({ error: 'Invalid parameter' });
    };
    if (duration < 0 || duration > 23) {
        return res.status(400).json({ error: 'Invalid time.' });
    }
    
    let hourExist = await Workinghour.countDocuments({doctorId: doctorId, date: date, duration: duration});
    if (!hourExist) {
        return res.status(404).json({error: 'The duration is not exist'});
    }

    await Workinghour.deleteOne({doctorId: doctorId, date: date, duration: duration}, (err, res) => {
        if (err)
            console.log(err);
    });
    res.send();
});

//The API for getting a doctor's working hours
router.get('/:doctorId/:date', (req, res) => {
    let doctorId = req.params.doctorId;
    let date = req.params.date;

    let workinghours = [];

    if (!doctorId || !date) {
        res.status(400);
        res.json({error: 'Invalid parameter'});
    }
    let detail = {doctorId: doctorId, date: date};

    Workinghour.find(detail, (err, hours) => {
        if (err) {
            console.log(err);
        } else {
            if (hours.length > 0) {
                for (hour of hours) {
                    workinghours.push(hour.duration);
                }
                res.json({doctorId: doctorId, workinghours: workinghours});
            } else {
                return res.status(404).json({error:'Cannot find the working hour. May be off duty or please check the doctor id'});
            }
        }
    });
});

module.exports = router;