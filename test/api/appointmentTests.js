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

const doc = {
    name: "Doctor",
    workingHours: [
        {
            date: "2019-03-04",
            startTime: 15700,
            endTime: 70000
        },
        {
            date: "2019-03-05",
            startTime: 15700,
            endTime: 70000
        },
        {
            date: "2019-03-06",
            startTime: 15700,
            endTime: 70000
        },
        {
            date: "2019-03-07",
            startTime: 15700,
            endTime: 70000
        }
    ]
};

const patient = {
    name: "Patient"
};

const setAppointmentDate = "2019-03-04";
const updateToAppointmentDate = "2019-03-07";

describe("API tests", () => {
    describe("Appointments", () => {
        let docId;
        let patientId;
        let appointmentUpdateId;
        let appointment;
        before((done) => {
            chai.request(app)
                .post("/doctors")
                .send(doc)
                .then((res) => {
                    res.should.have.status(201);
                    res.body.name.should.be.eql(doc.name);
                    docId = res.body._id;
                    chai.request(app)
                        .post("/patients")
                        .send(patient)
                        .then((res) => {
                            res.should.have.status(201);
                            res.body.name.should.be.eql(patient.name);
                            patientId = res.body._id;
                            done();
                        });
                });
        });

        it("should create a Appointment", (done) => {
            chai.request(app)
                .post("/appointments")
                .send({docId: docId, patientId: patientId, date: setAppointmentDate, startTime: 15700, endTime: 32400})
                .then((res) => {
                    res.should.have.status(201);
                    res.body.docId.should.be.eql(docId);
                    done();
                }).catch((error) => {
                console.error(error);
            });
        });

        it("should get all Appointments",(done)=> {
            chai.request(app)
                .get("/appointments?docId="+docId+"&date="+setAppointmentDate)
                .then((res) => {
                    res.should.have.status(200);
                    res.body.length.should.be.eql(1);
                    res.body[0].patientId.should.be.eql(patientId);
                    appointmentUpdateId = res.body[0]._id;
                    done();
                }).catch((error) => {
                console.error(error);
            });
        });

        it("should get a single Appointment",(done)=> {
            chai.request(app)
                .get("/appointments/" + appointmentUpdateId)
                .then((res) => {
                    res.should.have.status(200);
                    res.body.patientId.should.be.eql(patientId);
                    res.body._id.should.be.eql(appointmentUpdateId);
                    appointment = res.body;
                    done();
                }).catch((error) => {
                console.error(error);
            });
        });

        it("should update a Appointment",(done)=> {
            var newAppointment = {docId: docId, patientId: patientId, date: updateToAppointmentDate, startTime: 15700, endTime: 32400};
            chai.request(app)
                .patch("/appointments/" + appointmentUpdateId)
                .send(newAppointment)
                .then((res) => {
                    res.should.have.status(200);
                    console.log(res.body);
                    res.body.message.should.be.eql("Appointment successfully updated");
                    chai.request(app)
                        .get("/appointments?docId="+docId+"&date="+newAppointment.date)
                        .then((res) => {
                            res.should.have.status(200);
                            res.body.length.should.be.eql(1);
                            res.body[0].patientId.should.be.eql(patientId);
                            var resDate = new Date(res.body[0].date).toString();
                            resDate.should.be.eql(new Date(newAppointment.date).toString());
                            done();
                        });
                }).catch((error) => {
                console.error(error);
            });
        });

        after((done)=> {
            chai.request(app)
                .delete("/doctors/" + docId)
                .then((newRes) => {
                    newRes.should.have.status(200);
                    newRes.body.message.should.be.eql('Doctor successfully deleted');
                    chai.request(app)
                        .delete("/patients/" + patientId)
                        .then((newRes) => {
                            newRes.should.have.status(200);
                            newRes.body.message.should.be.eql('Patient successfully deleted');
                            done();
                        }).catch((error)=>{
                        console.log(error);
                    });
                }).catch((error)=>{
                console.log(error);
            });
        });
    });
});
