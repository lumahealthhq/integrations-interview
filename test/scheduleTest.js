const chai = require('chai');
// const Mocha = require('mocha');
chai.should();
chai.use(require('chai-as-promised'));
let scheduleModel = require("../models/schedule")
const mongoose = require("mongoose");
const dbConfig = require("../config/dbConfig").dev

// Dummy schedules
const firstSchedule = { from: 8, to: 17, details: "Main schedule"}
const secondSchedule = { from: 17, to: 24, details: "Night schedule"}

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
describe('Unit Tests for all schedule APIs', () => {
    it('As a user I can add a new schedule', () => {
        return scheduleModel.createSchedule(firstSchedule.from, firstSchedule.to, firstSchedule.details)
            .then((schedule) => {
                schedule.from.should.equal(8);
            });
    });
    it('As a user I can add a second schedule', () => {
        return scheduleModel.createSchedule(secondSchedule.from, secondSchedule.to, secondSchedule.details)
            .then((schedule) => {
                schedule.from.should.equal(17);
            });
    });
    it('As a user I can get all schedule data', () => {
        return scheduleModel.getSchedule()
            .then((schedules) => {
                schedules[0].from.should.equal(8);
            });
    });
    it('As a user I can get a schedule by id', () => {
        return scheduleModel.getScheduleById(0)
            .then((schedule) => {
                schedule[0].from.should.equal(8);
            });
    });
});

after(() => {
    mongoose.connection.close();
    // done();
});
  