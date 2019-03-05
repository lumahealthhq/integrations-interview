const Patient = require('../models').Patient;
const Appointment = require('../models').Appointment;

module.exports = {
  create(req, res) 
  {
    return Patient
      .create({
        patient_firstname: req.body['fname'],
        patient_lastname: req.body['lname'],
        patient_email: req.body['email']
      })
      .then(patient => res.status(201).send(patient))
      .catch(error => res.status(400).send(error));
  },
  getAllPatients(req, res) 
  {
    return Patient
      .findAll()
      .then(patients => res.status(200).send(patients))
      .catch(error => res.status(400).send(error));
  },
  getPatient(req, res) 
  {
    return Patient
      .findAll({
        where: {
          id: req.params.id,
        }
      })
      .then(patient => res.status(200).send(patient))
      .catch(error => res.status(400).send(error));
  },
  getAppointments(req, res) 
  {
    return Appointment
      .findAll({
        where: {
          patient_id: req.params.id,
        }
      })
      .then(appts => res.status(200).send(appts))
      .catch(error => res.status(400).send(error));
  }
}; 