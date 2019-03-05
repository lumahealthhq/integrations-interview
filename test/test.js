var supertest = require('supertest');
var chai = require('chai');
var chaiHttp = require('chai-http');
var app = require('../index');
var should = require("should");

global.expect = chai.expect;
global.app = app;
global.request = supertest(app);
chai.use(chaiHttp);

describe('Test Cases', function () {

    it('Doctors working hours Test - add new availability', function (done) {
        request.post('/doctoravailability')
            .send({
                "id": "5c7dc34671a6b7087ea242f2",
                "date": "2019-03-01",
                "startTime": "12:00",
                "endTime": "16:00"
            })
            .expect("Content-type", /json/)
            .expect(200)
            .end(function (err, res) {
                if (err) done(err);
                chai.assert.equal(res.body.message , 'Availability added successfully')
                done();
            });
    });

    it('Doctors working hours Test - update availability', function (done) {
        request.post('/doctoravailability')
            .send({
                "id": "5c7dc34671a6b7087ea242f2",
                "date": "2019-03-01",
                "startTime": "09:00",
                "endTime": "16:00"
            })
            .expect("Content-type", /json/)
            .expect(200)
            .end(function (err, res) {
                if (err) done(err);
                chai.assert.equal(res.body.message , 'Availability changed successfully')
                done();
            });
    });

    // it('Doctors working hours Test', function (done) {
    //     request.post('/doctoravailability')
    //         .send({
    //             "id": "5c7c309685044c7174e6f02e",
    //             "date": "2019-03-01",
    //             "startTime": "09:00",
    //             "endTime": "12:00"
    //         })
    //         .expect("Content-type", /json/)
    //         .expect(200)
    //         .end(function (err, res) {
    //             if (err) done(err);
    //             chai.assert.equal(res.body.message , 'Availability changed successfully')
    //             chai.assert.equal(res.body.message , 'Cancelled Bookings')
    //             chai.assert.equal(res.body.cancelledBookings[0])
    //             done(err);
    //         });
    // });


    it('Get Doctor Hours', function (done) {
        request.get('/get_doctors_hours/5c7dc34671a6b7087ea242f2/2019-03-01')
            .expect("Content-type", /json/)
            .expect(200)
            .end(function (err, res) {
                if (err) done(err);
                chai.assert.equal(res.body.info[0].availability[0].date,'2019-03-01')
                done()
            });
    });

    it('Get Doctor Hours - no availability given by doctor', function (done) {
        request.get('/get_doctors_hours/5c7dc3d871a6b7087ea242f3/2019-05-01')
            .expect("Content-type", /json/)
            .expect(200)
            .end(function (err, res) {
                if (err) done(err);
                chai.assert.equal(res.body.info[0] , null)
                done()
            });
    });

    it('Book Appoitnment - doctor not available', function (done) {
        request.post('/book_appointment')
            .send({
                "doctorId": "5c7dc34671a6b7087ea242f2",
                "patientId": "5c7dc2eff8ab640872ba1466",
                "date": "2019-03-01",
                "startTime": "8:00",
                "endTime": "9:00"
            })
            .expect("Content-type", /json/)
            .expect(200)
            .end(function (err, res) {
                if (err) done(err);
                chai.assert.equal(res.body , 'Doctor is not available at this time')
                done();
            });
    });


    it('Book Appointnment - normal', function (done) {
        request.post('/book_appointment')
            .send({
                "doctorId": "5c7dc34671a6b7087ea242f2",
                "patientId": "5c7dc2eff8ab640872ba1466",
                "date": "2019-03-01",
                "startTime": "13:00",
                "endTime": "14:00"
            })
            .expect("Content-type", /json/)
            .expect(200)
            .end(function (err, res) {
                if (err) done(err);
                chai.assert.equal(res.body.message , 'Appointment booked successfully')
                done(err);
            });
    });

    it('Book Appoitnment - time slot already booked', function (done) {
        request.post('/book_appointment')
            .send({
                "doctorId": "5c7dc34671a6b7087ea242f2",
                "patientId": "5c7dc2eff8ab640872ba1466",
                "date": "2019-03-01",
                "startTime": "13:00",
                "endTime": "14:00"
            })
            .expect("Content-type", /json/)
            .expect(200)
            .end(function (err, res) {
                if (err) done(err);
                chai.assert.equal(res.body.message , 'Time slot already booked.')
                done();
            });
    });

    
});
