const chai = require('chai');
const chaiHttp = require('chai-http');
const request = require('request-promise-native');
const should = chai.should();

const mongoose = require('mongoose');

const Appointment = require('../models/appointment');
const Doctor = require('../models/doctor');
const Patient = require('../models/patient');
const Hour = require('../models/workinghour');
const config = require('../config.json');
const port = config.PORT;

mongoose.connect(config.DB_URI, {user: 'testAdmin', pass: 'testAdmin#1'});
chai.use(chaiHttp);
target = `http://localhost:${port}`

describe('Dummy Data', () => {
    it('It should re-create all tables.', async () => {
        await Patient.deleteMany({});
        await Doctor.deleteMany({});
        await Hour.deleteMany({});
        await Appointment.deleteMany({});
    });
    
});

describe("Find a doctor's working hours", () => {
    before((done) => {
        request('https://randomuser.me/api/?results=100&nat=us&inc=name,location,phone', async (err, res, body) => {
            body = JSON.parse(body);
            let patientId = 0;
            let doctorId = 0;
            for (let i = 0; i < 10; i++) {
                let data = body.results[i];
                if (i < 7) {
                    let patient = new Patient({
                        patientId: (patientId++).toString(),
                        firstName: data.name.first,
                        lastName: data.name.last,
                    });
                    await patient.save().then();
                } else {
                    let doctor = new Doctor({
                        doctorId: (doctorId++).toString(),
                        firstName: data.name.first,
                        lastName: data.name.last
                    });
                    await doctor.save().then();
                }
            }
            done();
        });
    });


    describe("POST /:doctorId/:date", () => {
        it('It should create a working hours for a specific doctor', (done) => {
            chai.request(target)
            .post('/workingHours/0/create')
            .send({ date: '2019-03-03', duration: '10' })
            .end((err, res) => {
                should.exist(res);
                res.should.have.status(200);
                res.body.should.be.empty;
                done();
            });
        });

        it('It should return a list of working hours from a specific doctor', (done) => {
            chai.request(target)
            .get('/workingHours/0/2019-03-03')
            .send()
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.have.property('doctorId');
                res.body.should.have.property('workinghours');
                done();
            });
        });

        it('It should delete the working hours from a specific doctor', (done) => {
            chai.request(target)
            .delete('/workingHours/0/delete')
            .send({date: '2019-03-03', duration: 10})
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.empty;
                done();
            });
        });

        it('It should be no working hours from a specific doctor', (done) => {
            chai.request(target)
            .get('/workingHours/0/2019-03-03')
            .send()
            .end((err, res) => {
                res.should.have.status(404);
                done();
            });
        });
    });
});


describe("Book an doctor opening", () => {
    before(async (done) => {
        let workhourA = new Hour({
            doctorId: '0',
            date: '2019-03-03',
            duration: '10',
            status: 'free',
        });
        let workhourB = new Hour({
            doctorId: '0',
            date: '2019-03-03',
            duration: '11',
            status: 'busy',
        });

        workhourA.save().then();
        workhourB.save().then();
        done();
    });

    it('It should create an appointment', (done) => {
        chai.request(target)
        .post('/appointments/1/create')
        .send({doctorId: '0', date: '2019-03-03', duration: '10'})
        .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.empty;
            done();
        })

    });

    it('It should get appointments of a patient', (done) => {
        chai.request(target)
        .get('/appointments/patient/1')
        .send()
        .end((err, res) => {
            res.should.have.status(200);
            res.body.should.have.property('patientId');
            res.body.should.have.property('allAppointment');
            done();
        })

    });

    it('It should delete an appointment', (done) => {
        chai.request(target)
        .delete('/appointments/1/delete')
        .send({doctorId: '0', date: '2019-03-03', duration: '10'})
        .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.empty;
            done();
        })
    });

    it('It should re-create the same appointment', (done) => {
        chai.request(target)
        .post('/appointments/1/create')
        .send({doctorId: '0', date: '2019-03-03', duration: '10'})
        .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.empty;
            done();
        })

    });
})