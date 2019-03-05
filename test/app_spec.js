var chai = require('chai');
var chaiHttp = require('chai-http');
var app = require('../app');

var expect = chai.expect;

chai.use(chaiHttp);

var doctor = 
{
    "fname":"John",
    "lname": "Oliver",
    "email": "john.oliver@gmail.com"
};

var patient = 
{
    "fname":"Oz",
    "lname": "Papa",
    "email": "oz.papa@gmail.com"
};

var schedules = [];
schedules.push({"id":"2", "date": "2019-03-10", "stime": "9:00", "etime":"17:00"})
schedules.push({"id":"2", "date": "2019-03-11", "stime": "9:00", "etime":"17:00"})

var appointment = 
{
    "patientId": "8",
    "doctorId": "2",
    "apptDate": "2019-03-10",
    "stime": "10:00",
    "etime": "11:00"
}

describe('App', function() {
    describe('/api/doctor/getall', function() {
        it('returns all doctors', function(done) {
            chai.request(app)
                .get('/api/doctor/getall')
                .end(function(err, res) {
                    expect(res).to.have.status(200);
                    done();
            });          
        });
    });

    describe('/api/doctor/create', function() {
        it('creates a doctor entry', function(done) {
            chai.request(app)
                .post('/api/doctor/create')
                .send(doctor)
                .end(function(err, res) {
                    expect(res).to.have.status(201);
                    done();
            });          
        });
    });

    describe('/api/doctor/getallworkinghours/:id', function() {
        it('gets a doctors working hours', function(done) {
            chai.request(app)
                .get('/api/doctor/getallworkinghours/2')
                .send(patient)
                .end(function(err, res) {
                    expect(res).to.have.status(200);
                    done();
            });          
        });
    });

    describe('/api/doctor/createavailabilities', function() {
        it('creates a list of working hours for the doctor', function(done) {
            chai.request(app)
                .post('/api/doctor/createavailabilities')
                .send(schedules)
                .end(function(err, res) {
                    expect(res).to.have.status(201);
                    done();
            });          
        });
    });

    describe('/api/patient/getall', function() {
        it('returns all patients', function(done) {
            chai.request(app)
                .get('/api/patient/getall')
                .end(function(err, res) {
                    expect(res).to.have.status(200);
                    done();
            });          
        });
    });

    describe('/api/doctor/create', function() {
        it('creates a patient entry', function(done) {
            chai.request(app)
                .post('/api/patient/create')
                .send(patient)
                .end(function(err, res) {
                    expect(res).to.have.status(201);
                    done();
            });          
        });
    });

    describe('/api/appointment/bookappointment', function() {
        it('books an appointment for a doctor', function(done) {
            chai.request(app)
                .post('/api/appointment/bookappointment')
                .send(appointment)
                .end(function(err, res) {
                    expect(res).to.have.status(200);
                    done();
            });          
        });
    });

    describe('/api/appointment/bookappointment', function() {
        it('should fail due to appointment conflict', function(done) {
            chai.request(app)
                .post('/api/appointment/bookappointment')
                .send(appointment)
                .end(function(err, res) {
                    expect(res).to.have.status(400);
                    done();
            });          
        });
    });
  });