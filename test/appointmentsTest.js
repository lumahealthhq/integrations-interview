'use strict';
const mongoose = require('mongoose');
const chai = require('chai');
const expect = require('chai').expect;
const chai_http = require('chai-http');
const app = require('../app.js');
let id = ' ';
let doctor_id = mongoose.Types.ObjectId;
let patient_id = mongoose.Types.ObjectId;
chai.use(chai_http);
describe('API endpoint/doctors', function() {
    it('should create doctors', function() {
        return chai.request(app)
            .post('/doctors')
            .send({
                    "name": "Akash Jidda",
                    "address": {
                        "city": "San Francisco",
                        "state": "California"
                    },
                    "availability": [
                        {
                            "date": "1/10/2019",
                            "startTime": "10:00",
                            "endTime": "16:00",
                            "slots": [
                                "10:00",
                                "10:30",
                                "11:00",
                                "12:00"
                            ]
                        },
                    ]
                }
            )
            .then(function (res){
                doctor_id = res.body.CreatedDoctor._id;
                console.log(doctor_id);
                expect(res).to.have.status(201);
            });
    });
});
describe('API endpoint/patients', function() {
    it('should create patient', function() {
        return chai.request(app)
            .post('/patients')
            .send({name:"Akash Jidda"})
            .then(function (res){
                patient_id = res.body.CreatedPatient._id;
                console.log(patient_id);
                expect(res).to.have.status(201);
            });
    });
});
describe('API endpoint/appointments', function() {
    it('should return all appointments', function() {
        return chai.request(app)
            .get('/appointments')
            .then(function (res){
                expect(res).to.have.status(200);
            });
    });

    it('should create appointments', function() {
        return chai.request(app)
            .post('/appointments')
            .send({
                "doctor": doctor_id,
                "patient": patient_id,
                "date": "3/10/2019",
                "slot": "12.00"
            })
            .then(function (res){
                id = res.body._id;
                console.log(id);
                expect(res).to.have.status(201);
            });
    });

    it('should return all appointments of doctor', function() {
        return chai.request(app)
            .get('/appointments/'+doctor_id)
            .then(function (res){
                expect(res).to.have.status(200);
            });
    });

    it('should return all appointments of patient', function() {
        return chai.request(app)
            .get('/appointments/'+patient_id)
            .then(function (res){
                expect(res).to.have.status(200);
            });
    });
    it('should delete appointment', function() {
        return chai.request(app)
            .delete('/appointments/'+id)
            .then(function (res){
                expect(res).to.have.status(200);
            });
    });

});
describe('API endpoint/doctors', function() {
    it('should delete doctor', function() {
        return chai.request(app)
            .delete('/doctors/'+ doctor_id)
            .then(function (res){
                expect(res).to.have.status(200);
            });
    });
});



