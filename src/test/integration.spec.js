import chai from 'chai';
import moment from 'moment';
import chaiHttp from 'chai-http';
import chaiAsPromised from 'chai-as-promised';

import app from '..';

chai.use(chaiAsPromised);
chai.use(chaiHttp);
chai.should();

const DATETIME_FORMAT = "YYYY-MM-DD HH:mm:ss";

const patient = {
    firstName: "Devajit",
    lastName: "Asem",
    email: "a@gmail.com",
    mobile: "9862995031"
};

const doctor = {
    firstName: "Jane",
    lastName: "Doe",
    email: "jane@gmail.com",
    mobile: "986234234"
};

let patients = [];

describe("API Integration test", () => {
    describe("Patients", () => {
        describe("/POST patient", () => {
            it("should create a Patient", (done) => {
                chai.request(app)
                    .post("/api/patient")
                    .send(patient)
                    .then((res) => {
                        res.should.have.status(201);
                        done();
                    });
            });
        });

        describe("/GET patient", () => {
            it("should get all Patients", (done) => {
                chai.request(app)
                    .get("/api/patient")
                    .then((res) => {
                        res.should.have.status(200);
                        done();
                    });
            });
        });

        // it("should get Patient's appointments", (done) => {
        //     done();
        // })
    });

    describe("Doctors", () => {
        describe("/POST doctor", () => {
            it("should create a Doctor", (done) => {
                chai.request(app)
                    .post("/api/doctor")
                    .send(doctor)
                    .then((res) => {
                        res.should.have.status(201);
                        done();
                    });
            });
        });

        describe("/PUT /doctor/:id", () => {
            it("should update a Doctor", (done) => {
                const updateData = {firstName: "John", email: 'new@gmail.com', mobile: '986234234'};
                chai.request(app)
                    .put("/api/doctor/1")
                    .send(updateData)
                    .then((res) => {
                        res.should.have.status(204);
                        done();
                    });
            });
        });

        describe("/POST /doctor/:id/schedule", () => {
            const schedules = [];
            const now = moment(new Date());
            schedules.push({
                availableFrom: now.format(DATETIME_FORMAT),
                availableTo: now.add(3, 'h').format(DATETIME_FORMAT)
            });

            it("should create a Doctor's list of schedules", (done) => {
                chai.request(app)
                    .post("/api/doctor/1/schedule")
                    .send(schedules)
                    .then((res) => {
                        res.should.have.status(201);
                        done();
                    });
            });
        });

        describe("/PUT /doctor/:id/schedule", () => {
            const schedules = [];
            const now = moment(new Date());
            schedules.push({
                availableFrom: now.add(3, 'h').format(DATETIME_FORMAT),
                availableTo: now.add(6, 'h').format(DATETIME_FORMAT)
            });

            it("should update a Doctor's list of schedules", (done) => {
                chai.request(app)
                    .put("/api/doctor/1/schedule")
                    .send(schedules)
                    .then((res) => {
                        res.should.have.status(204);
                        done();
                    });
            });
        });

        describe("/GET /doctor/:id/schedule", () => {
            it("should get a Doctor's list of schedules", (done) => {
                chai.request(app)
                    .get("/api/doctor/1/schedule")
                    .then((res) => {
                        res.should.have.status(200);
                        done();
                    });
            });
        });
    });

    describe("Appointments", () => {
        describe("/POST /appointment/patient/:patientId/doctor/:doctorId", () => {
            const now = moment();
            const appointment = {
                startAt: now.add(8, 'h').format(DATETIME_FORMAT),
                endAt: now.add(9, 'h').format(DATETIME_FORMAT)
            };

            it("should create an appointment", (done) => {
                chai.request(app)
                    .post("/api/appointment/patient/1/doctor/1")
                    .send(appointment)
                    .then((res) => {
                        res.should.have.status(201);
                        done();
                    });
            });
        });
    });
});