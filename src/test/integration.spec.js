import chai from 'chai';
import moment from 'moment';
import chaiHttp from 'chai-http';
import chaiAsPromised from 'chai-as-promised';

import app from '..';

chai.use(chaiAsPromised);
chai.use(chaiHttp);
chai.should();

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

describe("API Integration test", () => {
    describe("Patients", () => {
        describe("/POST patient", () => {
            it("should create a Patient", (done) => {
                chai.request(app)
                    .post("/api/patients")
                    .send(patient)
                    .then((res) => {
                        res.should.have.status(201);
                        done();
                    });
            });
        });

        describe("/GET patients", () => {
            it("should get all Patients", (done) => {
                chai.request(app)
                    .get("/api/patients")
                    .then((res) => {
                        res.should.have.status(200);
                        done();
                    });
            });
        });
    });

    describe("Doctors", () => {
        describe("/POST doctor", () => {
            it("should create a Doctor", (done) => {
                chai.request(app)
                    .post("/api/doctors")
                    .send(doctor)
                    .then((res) => {
                        res.should.have.status(201);
                        done();
                    });
            });
        });

        describe("/GET doctors", () => {
            it("should get all Doctors", (done) => {
                chai.request(app)
                    .get("/api/doctors")
                    .then((res) => {
                        res.should.have.status(200);
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
            it("should create a Doctor's list of schedules", (done) => {
                const schedules = [];
                schedules.push({
                    availableFrom: moment(),
                    availableTo: moment().add(3, 'h')
                });
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
            it("should update a Doctor's list of schedules", (done) => {
                const schedules = [];
                schedules.push({
                    availableFrom: moment(),
                    availableTo: moment().add(6, 'h')
                });

                console.info(schedules);

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
            it("should create a patient appointment", (done) => {
                const appointment = {
                    startAt: moment().add(2, 'h'),
                    endAt: moment().add(3, 'h')
                };

                // console.info("::appointment", appointment);

                chai.request(app)
                    .post("/api/appointment/patient/1/doctor/1")
                    .send(appointment)
                    .then((res) => {
                        res.should.have.status(201);
                        done();
                    });
            });

            it("should return doctor not available(406 - Not Acceptable)", (done) => {
                const appointment = {
                    startAt: moment().add(8, 'h'),
                    endAt: moment().add(9, 'h')
                };

                // console.info('::appointment', appointment);
                chai.request(app)
                    .post("/api/appointment/patient/1/doctor/1")
                    .send(appointment)
                    .then((res) => {
                        res.should.have.status(406);
                        done();
                    });
            });
        });

        describe("/GET /patient/:patientId/appointments", () => {
            it("should get all Patient appointments", (done) => {
                chai.request(app)
                    .get("/api/patients/1/appointments")
                    .then((res) => {
                        res.should.have.status(200);
                        done();
                    });
            });
        });

        describe("/GET /doctor/:doctorId/appointments", () => {
            it("should get all Doctor appointments", (done) => {
                chai.request(app)
                    .get("/api/doctor/1/appointments")
                    .then((res) => {
                        res.should.have.status(200);
                        done();
                    });
            });
        });
    });
});