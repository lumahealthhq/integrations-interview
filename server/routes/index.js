const Patient = require('../controllers').patient;
const Doctor = require('../controllers').doctor;
const Appointment = require('../controllers').appointment;

module.exports = (app) => {
  app.post('/api/patient/create', Patient.create);
  app.get('/api/patient/getall', Patient.getAllPatients);
  app.get('/api/patient/get/:id', Patient.getPatient);
  app.get('/api/patient/getappts/:id', Patient.getAppointments);
  
  app.post('/api/doctor/create', Doctor.create); 
  app.post('/api/doctor/createavailability', Doctor.createAvailability);
  app.post('/api/doctor/createlist', Doctor.createAvailabilities);
  app.post('/api/doctor/updateAvailability', Doctor.updateAvailability);
    
  app.get('/api/doctor/getall', Doctor.getAllDoctors);
  app.get('/api/doctor/get/:id', Doctor.getDoctor);
  app.get('/api/doctor/getappts/:id', Doctor.getAppointments);
  app.get('/api/doctor/getworkinghours/:id/:date', Doctor.getWorkingHours);
  app.get('/api/doctor/getallworkinghours/:id', Doctor.getAllWorkingHours);
  app.get('/api/doctor/getallworkinghours', Doctor.getDoctorsWorkingHours);  

  app.post('/api/appointment/bookappointment', Appointment.bookAppointment)
};