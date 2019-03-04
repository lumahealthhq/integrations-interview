const router = require('express').Router();
const mongoose = require('mongoose');

const Workinghour = require('../models/workinghour');
const Doctor = require('../models/doctor');
const Patient = require('../models/patient')
const Appointment = require('../models/appointment')
const config = require('../config.json');

mongoose.connect(config.DB_URI, {user: 'testAdmin', pass: 'testAdmin#1', useNewUrlParser: true});

//The API to book an doctor opening
router.post('/:patientId/create/', async (req, res) => {
    let patientId = req.params.patientId;
    let doctorId = req.body.doctorId;
    let date = req.body.date;
    let duration = req.body.duration;
    
    if (!patientId || !doctorId || !date || !duration) {
        return res.status(400).json({ error: 'Invalid parameter' });
    };

    if (duration < 0 || duration > 23) {
        return res.status(400).json({ error: 'Invalid duration.' });
    }

    let doctorExist = await Doctor.countDocuments({doctorId: doctorId});
    if (!doctorExist) {
        console.log('No such doctor');
        return res.status(404).json({error: 'There is no such doctor'});
    }

    let patientExist = await Patient.countDocuments({patientId: patientId});
    if (!patientExist) {
        console.log('No such patient');
        return res.status(404).json({error: 'This patient has not been recorded.'});
    }

    let hourDetail = await Workinghour.countDocuments({doctorId: doctorId, date: date, duration: duration});
    if (!hourDetail) {
        return res.status(409).json({error: 'This duration is off-duty'});
    } else {
        let hour = await Workinghour.findOne({doctorId: doctorId, date: date, duration:duration});
        if (hour.status == "busy") {
            return res.status(409).json({error: 'This duration is busy'});
        }
    }
    await Appointment.create({
        doctorId: doctorId,
        patientId: patientId,
        date: date,
        duration: duration
    }, (err, result) => {
        if (err) {
            return res.status(500).json({error: 'Some issue happens between server and databse.'});
        }
    });
    await Workinghour.findOneAndUpdate({doctorId: doctorId, date: date, duration:duration}, {$set:{status:"busy"}});
    res.send();
});

//The API to cancel an doctor opening
router.delete('/:patientId/delete/', async (req, res) => {
    let patientId = req.params.patientId;
    let doctorId = req.body.doctorId;
    let date = req.body.date;
    let duration = req.body.duration;

    if (!patientId || !doctorId || !date || !duration) {
        return res.status(400).json({ error: 'Invalid parameter' });
    };

    let appointmentCount = await Appointment.countDocuments({
        patientId: patientId, 
        doctorId: doctorId, 
        date: date, 
        duration: duration});
    if (!appointmentCount) {
        return res.status(404).json({error: 'There is no such appointment'});
    }
    let apointment = await Appointment.deleteMany({
        patientId: patientId, 
        doctorId: doctorId, 
        date: date, 
        duration:duration
        }, (err, result) => {
                if (err) {
                    return res.status(500).json({error: 'Some issue happens between server and databse.'});
                }
        });
        await Workinghour.findOneAndUpdate({doctorId: doctorId, date: date, duration:duration}, {$set:{status:"free"}});
        res.send();
});

//The API to list appointment related to a patient
router.get('/patient/:patientId', async (req, res) => {
    let patientId = req.params.patientId;
    if (!patientId) {
        return res.status(400).json({erro: 'Invalid parameter'});
    }

    let patientExist = await Patient.countDocuments({patientId: patientId});
    if (!patientExist) {
        return res.status(404).json({error: 'This patient has not been recorded.'});
    }

    let appointmentCount = await Appointment.countDocuments({patientId: patientId});
    if (!appointmentCount) {
        return res.status(404).json('There is no such appointment');
    }

    let allAppointment = {};

    await Appointment.find({patientId: patientId}, (err, appointments) => {
        if (err) {
            console.log(err);
        } else {
            for (appointment of appointments) {
                let day = appointment.date;
                allAppointment[day] = allAppointment[day] || [];
                allAppointment[day].push(appointment.duration);
            }
        }
    });
    res.json({patientId: patientId, allAppointment: allAppointment});
});

//The API to list appointment related to a doctor
router.get('/doctor/:doctorId', async (req, res) => {
    let doctorId = req.params.doctorId;
    
    if (!doctorId) {
        return res.status(400).json({erro: 'Invalid parameter'});
    }

    let doctorExist = await Doctor.countDocuments({doctorId: doctorId});
    if (!doctorExist) {
        return res.status(404).json({error: 'There is no such appointment.'});
    }

    let appointmentCount = await Appointment.countDocuments({doctorId: doctorId});
    if (!appointmentCount) {
        return res.status(404).json('There is no such appointment');
    }

    let allAppointment = {};

    await Appointment.find({doctorId: doctorId}, (err, appointments) => {
        if (err) {
            console.log(err);
        } else {
            for (appointment of appointments) {
                let day = appointment.date;
                allAppointment[day] = allAppointment[day] || [];
                allAppointment[day].push(appointment.duration);
            }
        }
    });
    res.json({doctorId: doctorId, allAppointment: allAppointment});
});

module.exports = router;