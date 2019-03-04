const chai = require('chai');
// const Mocha = require('mocha');
chai.should();
chai.use(require('chai-as-promised'));
let patientModel = require("../models/patient")
const mongoose = require("mongoose");
const dbConfig = require("../config/dbConfig").dev

// Dummy patients
const alan = { firstName: "Alan", lastName: "Robin", gender: "M", weight : 174, height: 172, origin : 1, allergic : [1,2]  }
const candice = { firstName: "Candice", lastName: "Facts", gender: "F", weight : 160, height: 168, origin : 2, allergic : [1]  }

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
describe('Unit Tests for all patient APIs', () => {
    it('As a user I can add a new patient', () => {
        return patientModel.createPatient(alan.firstName, alan.lastName, alan.gender, alan.weight, alan.height, alan.origin, alan.allergic)
            .then((patients) => {
                patients.firstName.should.equal("Alan");
            });
    });
    it('As a user I can add another patient', () => {
        return patientModel.createPatient(candice.firstName, candice.lastName, candice.gender, candice.weight, candice.height, candice.origin, candice.allergic)
            .then((patients) => {
                patients.firstName.should.equal("Candice");
            });
    });
    it('As a user I can get all patients data (first patient)', () => {
        return patientModel.getPatient()
            .then((patientss) => {
                patientss[0].firstName.should.equal("Alan");
            });
    });
    it('As a user I can get a patient by id', () => {
        return patientModel.getPatientById(0)
            .then((patients) => {
                patients[0].firstName.should.equal("Alan");
            });
    });
});
