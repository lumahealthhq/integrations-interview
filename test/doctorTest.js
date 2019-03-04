const chai = require('chai');
// const Mocha = require('mocha');
chai.should();
chai.use(require('chai-as-promised'));
let doctorModel = require("../models/doctor")
const mongoose = require("mongoose");
const dbConfig = require("../config/dbConfig").dev

// Dummy Doctors
const panu = { firstName: "Panu", lastName: "K", gender: "M", scheduleType : 1, specialties : [1] }
const alex = { firstName: "Alex", lastName: "Gold", gender: "M", scheduleType : 2, specialties : [1,4] }

//Setting up dev connection
before((done) => {
    const url = "mongodb+srv://" + dbConfig.username + "@" +dbConfig.location + "/" + dbConfig.database +"?retryWrites=true";
    mongoose.connect(url, { useNewUrlParser: true });
    mongoose.set("useCreateIndex", true);
    const db = mongoose.connection;
    db.on('error', console.error.bind(console, 'Cannot connect to the DB'));
    db.once('open', () => {
        done();
    });
});
//unit test part
describe('Unit Tests for all doctor APIs', () => {
    it('As a user I can add a new doctor', () => {
        return doctorModel.createDoctor(panu.firstName, panu.lastName, panu.gender, panu.scheduleType, panu.specialties)
            .then((doctor) => {
                doctor.firstName.should.equal("Panu");
            });
    });
    it('As a user I can add another doctor', () => {
        return doctorModel.createDoctor(alex.firstName, alex.lastName, alex.gender, alex.scheduleType, alex.specialties)
            .then((doctor) => {
                doctor.firstName.should.equal("Alex");
            });
    });
    it('As a user I can get all doctor data (test first doctor)', () => {
        return doctorModel.getDoctor()
            .then((doctors) => {
                doctors[0].firstName.should.equal("Panu");
            });
    });
    it('As a user I can get a doctor by id', () => {
        return doctorModel.getDoctorById(0)
            .then((doctor) => {
                doctor[0].firstName.should.equal("Panu");
            });
    });
});