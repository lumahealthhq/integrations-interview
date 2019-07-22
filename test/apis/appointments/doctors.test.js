const request = require('supertest');
const config = require('config');
const mongoose = require('mongoose');
const assert = require('assert');
const app = require('../../../build/app'); 
const DoctorSchema = require('../../../build/apis/appointments/models/Doctor');

let instance = {};
let db = {};
let Doctor = {};

let doctorDocumentData = {
  firstName: 'FirstName',
  lastName: 'LastName',
  workingDays: [
    { 
      weekDay: 'Monday',
      times: [
        {
          start: '8:00AM',
          end: '5:00PM'
        }
      ]
    },
    { 
      weekDay: 'Thursday',
      times: [
        {
          start: '8:00AM',
          end: '5:00PM'
        }
      ]
    }
  ]
};

before(function(done) {
  db = mongoose.createConnection(config.get('appointments.mongodb'));
  db.once('open', function() {
    Doctor = db.model('Doctor', DoctorSchema);
    const document = new Doctor(doctorDocumentData);
    document.save(function() {
      instance = document;
      done();
    });
  });
});

describe('Find doctor`s working days by id ', function() {

  it('should get doctor by expected id', function(done) {
    request(app)
      .get(`/appointments/api/doctors/${instance._id}`)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .end(function(err, res) {
        const { body } = res;
        assert.equal(body._id, instance._id, `doctor id`);
        assert.equal(body.firstName, instance.firstName, `doctor firstName`);
        assert.equal(body.lastName, instance.lastName, `doctor firstName`);
        return done();
      });
  });

  it('should not get doctor with wrong id', function(done) {
    const wrongDoctorId = '5d353713548cc76cf9923c99';
    request(app)
      .get(`/appointments/api/doctors/${wrongDoctorId}`)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(404, done);
  });

});

describe('Create doctor', function() {

  it('should create a doctor', function(done) {
    request(app)
      .post('/appointments/api/doctors')
      .send(doctorDocumentData)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(201)
      .end(function(err, res) {
        const { body: doctor } = res;
        assert.equal(doctor.firstName, doctorDocumentData.firstName, `doctor firstName`);
        assert.equal(doctor.lastName, doctorDocumentData.lastName, `doctor firstName`);
        assert.equal(2, doctor.workingDays.length);
        return done();
      });
  });

});

describe('Create and update the list of doctor`s working hours', function() {

  it('should update a doctor`s working days', function(done) {
    request(app)
      .patch(`/appointments/api/doctors/${instance._id}/working-days`)
      .send([
        { 
          weekDay: 'Monday',
          times: [
            {
              start: '8:00AM',
              end: '5:00PM'
            }
          ]
        }
      ])
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .end(function(err, res) {
        const { body: workingDays } = res;

        assert.equal(1, workingDays.length);
        done();
      });
  });

});

after(function(done) {
  Doctor.deleteMany({}, function() {
    done();
  });
});