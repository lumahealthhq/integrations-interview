const express = require('express');
const router = express.Router();
const Doctor = require('../models/Doctor');
const mongoose = require('mongoose');

const DoctorsController = require('../controllers/doctorsc');

router.get('/',DoctorsController.doctors_get_all);

router.post('/',DoctorsController.doctors_post);

router.get('/:doctorId',DoctorsController.get_doctor_by_id);

router.delete('/:doctorId',DoctorsController.delete_doctor);

router.patch('/:doctorId',DoctorsController.doctor_patch);

module.exports = router;