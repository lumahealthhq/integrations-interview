import { Router } from 'express';
import * as patientController from "../controllers/patient-controller";
import * as doctorController from "../controllers/doctor-controller";
import * as appointmentController from "../controllers/appointment-controller";

const router = Router();

// Patients' routes
router.post('/patient', patientController.createPatient);
// router.put('/patient', createPatient);

// Appointment routes
router.post('/appointment/patient/:patientId/doctor/:doctorId', appointmentController.bookAppointment);

// Doctors' routes
router.post('/doctor', doctorController.createDoctor);
router.put('/doctor/:doctorId', doctorController.updateDoctor);
router.post('/doctor/:doctorId/schedule', doctorController.createDoctorSchedules);
router.put('/doctor/:doctorId/schedule', doctorController.updateDoctorSchedules);
router.get('/doctor/:doctorId/schedule', doctorController.getDoctorSchedules);

export default router;
