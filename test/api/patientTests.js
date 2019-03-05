'use strict';

process.env.NODE_ENV = 'test';
process.env.PORT = 3001;

const chai = require('chai'),
    moment = require('moment'),
    chaiHttp = require('chai-http'),
    chaiAsPromised = require('chai-as-promised');

const app = require('../../server.js');

chai.use(chaiAsPromised);
chai.use(chaiHttp);
chai.should();

const patient = {
    name: "Test Patient"
};


const patient_new = {
    name: "Patient new"
}

describe("API tests", () => {
    describe("Patients", () => {
        it("should create a Patient", (done) => {
            chai.request(app)
                .post("/patients")
                .send(patient)
                .then((res) => {
                    res.should.have.status(201);
                    res.body.name.should.be.eql(patient.name);
                    done();
                }).catch((error) => {
                console.error(error);
            });
        });

        it("should get all Patients", (done) => {
            chai.request(app)
                .get("/patients")
                .then((res) => {
                    res.should.have.status(200);
                    res.body[0].name.should.be.eql(patient.name);
                    done();
                });
        });

        it("should update a Patient", (done) => {
            chai.request(app)
                .get("/patients")
                .then((res) => {
                    res.should.have.status(200);
                    var id = res.body[0]._id;
                    chai.request(app)
                        .patch("/patients/" + id)
                        .send(patient_new)
                        .then((newRes) => {
                            newRes.should.have.status(200);
                            done();
                        }).catch((error)=>{
                        console.log(error);
                    });
                });
        });

        it("should delete a Patient", (done) => {
            chai.request(app)
                .get("/patients")
                .then((res) => {
                    res.should.have.status(200);
                    var id = res.body[0]._id;
                    chai.request(app)
                        .delete("/patients/" + id)
                        .then((newRes) => {
                            newRes.should.have.status(200);
                            newRes.body.message.should.be.eql('Patient successfully deleted');
                            done();
                        }).catch((error)=>{
                        console.log(error);
                    });
                });
        });
    });
});
