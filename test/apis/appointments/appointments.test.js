const request = require('supertest');
const config = require('config');
const mongoose = require('mongoose');
const moment = require('moment');
const assert = require('assert');
const app = require('../../../build/app'); 

const DoctorSchema = require('../../../build/apis/appointments/models/Doctor').default;
const PatientSchema = require('../../../build/apis/appointments/models/Patient').default;
const AppointmentSchema = require('../../../build/apis/appointments/models/Appointment').default;

let doctorInstance = {};
let patientInstance = {};
let db = {};
let Doctor = {};
let Patient = {};
let Appointment = {};

const doctorDocumentData = {
  "fisrtName": "Fistname",
  "lastName": "Lastname",
  "workingDays": [
    {
      "weekDay": "Monday",
      "times": [
        {
          "start": "10:00AM",
          "end": "05:00PM"
        }
      ]
    }
  ]
};

const patientDocumentData = {
  "firstName": "Patient",
  "lastName": "Fake",
  "email": "patient@email.com"
};

before(function(done) {
  db = mongoose.createConnection(config.get('appointments.mongodb'));
  db.once('open', function() {

    Doctor = db.model('Doctor', DoctorSchema);
    Patient = db.model('Patient', PatientSchema);
    Appointment = db.model('Appointment', AppointmentSchema);

    const saveDoctorPromise = new Promise(function(resolve, reject) {
      const doctorDocument = new Doctor(doctorDocumentData);
      doctorDocument.save(function(err) {
        if (err) {
          reject(err);
        }
        resolve(doctorDocument);
      })
    });
    const savePatientPromise = new Promise(function(resolve, reject) {
      const patientDocument = new Patient(patientDocumentData);
      patientDocument.save(function(err) {
        if (err) {
          reject(err);
        }
        resolve(patientDocument);
      })
    });

    Promise.all([
      saveDoctorPromise,
      savePatientPromise,
    ]).then(function(values) {
      doctorInstance = values[0];
      patientInstance = values[1];
      done();
    });
  });
});

describe('POST /appointments', function() {

  it('should book an doctor opening', function(done) {
    request(app)
      .post('/appointments/api/appointments')
      .send({
        doctorId: doctorInstance._id,
        patientId: patientInstance._id,
        at: {
          date: moment().day(8).format('YYYY-MM-DD'),
          time: '11:00 AM'
        }
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(201)
      .end(function(err, res) {
        const { body: appointment } = res;
        assert.equal(appointment.status, 'Scheduled', `appointment status`);
        assert.equal(appointment.doctorId, doctorInstance._id, `doctor id`);
        assert.equal(appointment.patientId, patientInstance._id, `patient id`);
        return done();
      });
  });

  it('should not book because doctor is busy', function(done) {
    request(app)
      .post('/appointments/api/appointments')
      .send({
        doctorId: doctorInstance._id,
        patientId: patientInstance._id,
        at: {
          date: moment().day(8).format('YYYY-MM-DD'),
          time: '11:00 AM'
        }
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(422, done);
  });

  it('should not book an doctor opening because there is no availaibility on day', function(done) {
    request(app)
      .post('/appointments/api/appointments')
      .send({
        doctorId: doctorInstance._id,
        patientId: patientInstance._id,
        at: {
          date: moment().day(2).format('YYYY-MM-DD'),
          time: '11:00 AM'
        }
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(422, done);
  });
});
