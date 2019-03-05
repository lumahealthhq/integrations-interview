'use strict';

const chai = require('chai');
const expect = require('chai').expect;
const chai_http = require('chai-http');
const app = require('../app.js');
let id = ' ';
chai.use(chai_http);

describe('API endpoint/doctors', function() {
    it('should return all doctors', function() {
        return chai.request(app)
        .get('/doctors')
        .then(function (res){
            expect(res).to.have.status(200);
        });
    });

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
                id = res.body.CreatedDoctor._id;
                console.log(id);
                expect(res).to.have.status(201);
            });
    });

    it('should get single doctor by id', function() {
        return chai.request(app)
            .get('/doctors/'+id)
            .then(function (res){
                expect(res).to.have.status(200);
            });
    });
    it('should get single doctor by id', function() {
        return chai.request(app)
            .patch('/doctors/'+id)
            .send({
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
            })
            .then(function (res){
                expect(res).to.have.status(200);
            });
    });

    it('should delete doctor', function() {
        return chai.request(app)
            .delete('/doctors/'+id)
            .then(function (res){
                expect(res).to.have.status(200);
            });
    });
});


/*
describe("API tests", () => {
    describe("doctors", () => {
        it("should get all Doctors", (done) => {
            chai.request(app)
                .get("/doctors")
                .then((res) => {
                    res.should.have.status(200);
                  //  res.body[0].name.should.be.eql(doctor.name);
                    done();
                });
        });
    });
});*/
