const express = require('express');
const router = express.Router();
/*
const Doctor = require('../models/Doctor');
const Patient = require('../models/Patient');
const Appointment = require('../models/Appointment');
const mongoose = require('mongoose');
*/

const AppointmentsController = require('../controllers/appointmentc');

router.get('/',AppointmentsController.get_all_appointments);

router.post('/', AppointmentsController.appointment_post);

router.delete('/:appointmentId', AppointmentsController.appointment_delete);

router.get('/:patientId',AppointmentsController.get_appointment_by_patientid);

router.get('/:doctorId', AppointmentsController.get_appointment_by_doctorid);

module.exports = router;
