import db from '../';
import AppointmentSchema from 'appointments/models/Appointment';
import DoctorSchema from 'appointments/models/Doctor';
import PatientSchema from 'appointments/models/Patient';

export const Appointment = db.model('Appointment', AppointmentSchema);
export const Doctor = db.model('Doctor', DoctorSchema);
export const Patient = db.model('Patient', PatientSchema);