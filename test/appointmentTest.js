const chai = require('chai');
// const Mocha = require('mocha');
chai.should();
chai.use(require('chai-as-promised'));
let appointmentModel = require("../models/appointment")
const mongoose = require("mongoose");
const dbConfig = require("../config/dbConfig").dev

// Dummy appointments id, details, assistant, start, minutes, end, diagnose, parrent, cancel
const firstAppointment = { details: { doctorId : 1, patientId : 1 } , assistant: [], start: "2019-03-10T20:34:21", minutes: 30, parrent: ""};
const secondAppointment = { details: { doctorId : 2, patientId : 1 } , assistant: [], start: "2019-03-11T20:34:21", minutes: 30, parrent: ""};
const UnSuccessfulAppointmentOne = { details: { doctorId : 1, patientId : 1 } , assistant: [], start: "2019-03-10T20:34:21", minutes: 30, parrent: ""};
const UnSuccessfulAppointmentTwo = { details: { doctorId : 3, patientId : 1 } , assistant: [], start: "2019-03-10T20:34:21", minutes: 30, parrent: ""};
let appIdOne;
let appIdTwo;

//Setting up dev connection
before((done) => {
    const url = "mongodb+srv://" + dbConfig.username + "@" +dbConfig.location + "/" + dbConfig.database +"?retryWrites=true";
    mongoose.connect(url, { useNewUrlParser: true });
    mongoose.set("useCreateIndex", true);
    const db = mongoose.connection;
    db.on('error', console.error.bind(console, 'Cannot connect to the DB'));
    db.once('open', () => {
        console.log('We are connected to dev database');
        done();
    });
});
//unit test part
describe('Unit Tests for all appointment APIs', () => {
    describe('Creating appointments set', () => {
        it('As a user I can add my first appointment', () => {
            return appointmentModel.createAppointment(firstAppointment.details, firstAppointment.assistant, firstAppointment.start, firstAppointment.minutes, firstAppointment.parrent)
                .then((appointment) => {
                    appointment.details.doctorId.should.equal(1);
                    appointment.details.patientId.should.equal(1);
                    appIdOne = appointment._id;
                });
        });
        it('As a user I can add my second appointment', () => {
            return appointmentModel.createAppointment(secondAppointment.details, secondAppointment.assistant, secondAppointment.start, secondAppointment.minutes, secondAppointment.parrent)
                .then((appointment) => {
                    appointment.details.doctorId.should.equal(2);
                    appointment.details.patientId.should.equal(1);
                    appIdTwo = appointment._id;
                });
        });
        it('As a user I cannot book an appointment with the doctor that is already booked', () => {
            return appointmentModel.createAppointment(UnSuccessfulAppointmentOne.details, UnSuccessfulAppointmentOne.assistant, UnSuccessfulAppointmentOne.start, UnSuccessfulAppointmentOne.minutes, UnSuccessfulAppointmentOne.parrent)
            .should.be.rejectedWith("Doctor's Schedule already booked!");
        });
        it('As a user I cannot book an appointment with on the time that the patient is already booked', () => {
            return appointmentModel.createAppointment(UnSuccessfulAppointmentTwo.details, UnSuccessfulAppointmentTwo.assistant, UnSuccessfulAppointmentTwo.start, UnSuccessfulAppointmentTwo.minutes, UnSuccessfulAppointmentTwo.parrent)
                .should.be.rejectedWith("Patient's Schedule already booked!");
                
            });
    });

        setTimeout( () => {
            it("created async", () => {
                console.log("Async created");
            });
        }, 1000);
    describe('Getting information (workhour, appointments) set', () => {
            it('As a user I can get all appointments', () => {
                return appointmentModel.getAppointments()
                    .then((appointment) => {
                        appointment[0].details.doctorId.should.equal(2);
                        appointment[1].details.doctorId.should.equal(2);
                    });
            });
            it('As a user I can get doctor appointments', () => {
                return appointmentModel.getDoctorAppointments(1, 0, 2)
                    .then((appointment) => {
                        appointment[0].details.doctorId.should.equal(1);
                        appointment[0].details.patientId.should.equal(1);
                    });
            });
            it('As a user I can get patient appointments', () => {
                return appointmentModel.getPatientAppointments(1, 0, 2)
                    .then((appointment) => {
                        appointment[0].details.doctorId.should.equal(1);
                        appointment[1].details.patientId.should.equal(1);
                    });
            });
            it('As a user I can get workhour of the doctor', () => {
                return appointmentModel.getWorkHour(1, "2019-03-05T20:34:21", "2019-03-15T20:34:21")
                    .then((results) => {
                        results.should.equal("Doctor id: 1 has been working for 0 hours 0 mins. From: Tue Mar 05 2019 20:34:21 GMT-0800 (PST) to: Fri Mar 15 2019 20:34:21 GMT-0700 (PDT)");
                    });
            });
            it('As a user I can find free schedules of the doctor', () => {
                return appointmentModel.findFreeSchedule(1, "2019-03-06T20:34:21", "2019-03-15T20:34:21")
                    .then((results) => {
                        results.length.should.at.least(1);
                    });
            });
    });
        setTimeout( () => {
            it("created async", () => {
                console.log("Async created");
            });
        }, 1000);
    describe('Updating appointments set', () => {
        it('As a user I can update my first appointment', () => {
            const updatedFirstAppointment = { id: appIdOne, details: { doctorId : 1, patientId : 1 } , assistant: [], start: "2019-03-10T20:34:21", minutes: 30, end: "", diagnose :"", parrent: "", cancel : false};
            return appointmentModel.updateAppointment(updatedFirstAppointment.id, updatedFirstAppointment.details, updatedFirstAppointment.assistant, updatedFirstAppointment.start, updatedFirstAppointment.minutes, updatedFirstAppointment.end, updatedFirstAppointment.diagnose, updatedFirstAppointment.parrent, updatedFirstAppointment.cancel)
                .then((result) => {
                    result.ok.should.equal(1);
                });
        });
        it('As a user I can cancel my second appointment', () => {
            const cancelFirstAppointment = { id: appIdTwo, details: { doctorId : 1, patientId : 1 } , assistant: [], start: "2019-03-10T20:34:21", minutes: 30, end: "", diagnose :"", parrent: "", cancel : true};
            return appointmentModel.updateAppointment(cancelFirstAppointment.id, cancelFirstAppointment.details, cancelFirstAppointment.assistant, cancelFirstAppointment.start, cancelFirstAppointment.minutes, cancelFirstAppointment.end, cancelFirstAppointment.diagnose, cancelFirstAppointment.parrent, cancelFirstAppointment.cancel)
                .then((result) => {
                    result.ok.should.equal(1);
                });
        });

        it('As a user I can cancel my first appointment', () => {
            const cancelFirstAppointment = { id: appIdOne, details: { doctorId : 2, patientId : 1 } , assistant: [], start: "2019-03-10T20:34:21", minutes: 30, end: "", diagnose :"", parrent: "", cancel : true};
            return appointmentModel.updateAppointment(cancelFirstAppointment.id, cancelFirstAppointment.details, cancelFirstAppointment.assistant, cancelFirstAppointment.start, cancelFirstAppointment.minutes, cancelFirstAppointment.end, cancelFirstAppointment.diagnose, cancelFirstAppointment.parrent, cancelFirstAppointment.cancel)
                .then((result) => {
                    result.ok.should.equal(1);
                });
        });
    });

});