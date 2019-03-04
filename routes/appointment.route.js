const express = require('express');
const router = express.Router();

const appointmentController = require('../controllers/appointment.controller');

router.get('/all', appointmentController.viewAllAppointments);
router.get('/:id', appointmentController.viewAnAppointment);

module.exports = router;