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

const doctor = {
    name: "Test Doc",
    workingHours: [
        {
            date: "2019-03-02",
            startTime: 15700,
            endTime: 70000
        },
        {
            date: "2019-03-03",
            startTime: 15700,
            endTime: 70000
        },
        {
            date: "2019-03-04",
            startTime: 15700,
            endTime: 70000
        }
    ]
};

const doctor_new = {
    name: "Test Doc new",
    workingHours: [
        {
            date: "2019-03-02",
            startTime: 15700,
            endTime: 70000
        },
        {
            date: "2019-03-03",
            startTime: 15700,
            endTime: 70000
        },
        {
            date: "2019-03-04",
            startTime: 15700,
            endTime: 70000
        }
    ]
}

describe("API tests", () => {
    describe("Doctors", () => {
        it("should create a Doctor", (done) => {
            chai.request(app)
                .post("/doctors")
                .send(doctor)
                .then((res) => {
                    res.should.have.status(201);
                    res.body.name.should.be.eql(doctor.name);
                    done();
                }).catch((error) => {
                console.error(error);
            });
        });

        it("should get all Doctors", (done) => {
            chai.request(app)
                .get("/doctors")
                .then((res) => {
                    res.should.have.status(200);
                    res.body[0].name.should.be.eql(doctor.name);
                    done();
                });
        });

        it("should update a Doctor", (done) => {
            chai.request(app)
                .get("/doctors")
                .then((res) => {
                    res.should.have.status(200);
                    var id = res.body[0]._id;
                    chai.request(app)
                        .patch("/doctors/" + id)
                        .send(doctor_new)
                        .then((newRes) => {
                            newRes.should.have.status(200);
                            done();
                        }).catch((error)=>{
                        console.log(error);
                    });
                });
        });

        it("should delete a Doctor", (done) => {
            chai.request(app)
                .get("/doctors")
                .then((res) => {
                    res.should.have.status(200);
                    var id = res.body[0]._id;
                    chai.request(app)
                        .delete("/doctors/" + id)
                        .then((newRes) => {
                            newRes.should.have.status(200);
                            newRes.body.message.should.be.eql('Doctor successfully deleted');
                            done();
                        }).catch((error)=>{
                        console.log(error);
                    });
                });
        });
    });
});
