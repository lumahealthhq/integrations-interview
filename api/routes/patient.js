const express = require('express');
const router = express.Router();

const PatientController = require('../controllers/patientc');

router.post('/',PatientController .patient_post);

router.get('/', PatientController.get_all_patients);

module.exports = router;