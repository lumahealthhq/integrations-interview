import {Router} from 'express';

import * as patientController from "../controllers/patient-controller";
import * as doctorController from "../controllers/doctor-controller";
import * as appointmentController from "../controllers/appointment-controller";

const router = Router();

// Patients' routes
router.post('/patients', patientController.createPatient);
router.get('/patients', patientController.getPatients);
router.get('/patients/:patientId/appointments', patientController.getPatientAppointments);

// Appointment routes
router.post('/appointment/patient/:patientId/doctor/:doctorId', appointmentController.bookAppointment);

// Doctors' routes
router.post('/doctors', doctorController.createDoctor);
router.get('/doctors', doctorController.getDoctors);
router.put('/doctor/:doctorId', doctorController.updateDoctor);
router.post('/doctor/:doctorId/schedule', doctorController.createDoctorSchedules);
router.put('/doctor/:doctorId/schedule', doctorController.updateDoctorSchedules);
router.get('/doctor/:doctorId/schedule', doctorController.getDoctorSchedules);
router.get('/doctor/:doctorId/appointments', doctorController.getDoctorAppointments);

export default router;
