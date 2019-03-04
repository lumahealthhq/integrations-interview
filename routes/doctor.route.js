const express = require('express');
const router = express.Router();

const doctorController = require('../controllers/doctor.controller');

router.get('/:id/availablehours', doctorController.getAvailableHours);
router.get('/all', doctorController.getAll);
router.put('/bookappointment', doctorController.bookAppointment);
router.post('/add', doctorController.addDoctor);

module.exports = router;