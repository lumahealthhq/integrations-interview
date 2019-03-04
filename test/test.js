const chai = require("chai");
const should = chai.should();
const chaiHttp = require("chai-http");
const assert = require("chai").assert;
const request = require("supertest");
const checker = require("../checker");

const express = require("express");
const app = express();
app.use(express.json());
require("../routes")(app);

chai.use(chaiHttp);
// test get a doctor's working hours
describe("/GET", function() {
  it("get workingHours,it should return Doctor not fount", function(done) {
    request(app)
      .get("/:name")
      .expect("Doctor not found")
      .expect(404, done);
  });
});

// test get a doctor's appointments
describe("/GET", function() {
  it("get appointments, it should return Doctor not fount", function(done) {
    request(app)
      .get("/appointments/:name")
      .expect("Doctor not found")
      .expect(404, done);
  });
});

// test create doctor working hour
describe("/workingHours", function() {
  it("create a new doctor, should return the information of this doctor", function(done) {
    let input = {
      name: "Jack",
      workingHours: {
        "2019-03-23": "15:20"
      }
    };
    chai
      .request(app)
      .post("/workingHours")
      .send(input)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a("object");
        res.body.should.have.property("name").eql("Jack");
        done();
      });
  });
});

// test create an apppointments
describe("/appointments", function() {
  it("create a new doctor, should return the information of this doctor", function(done) {
    let input = {
      patientName: "Mary",
      doctorName: "Jack",
      appointDate: "2019-03-23",
      appointTime: "17:18"
    };
    chai
      .request(app)
      .post("/appointments")
      .send(input)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a("object");
        res.body.should.have.property("doctorName").eql("Jack");
        res.body.should.have.property("patientName").eql("Mary");
        done();
      });
  });
});

// test checkers
describe("checkValidDoctor", function() {
  it("input doesn't match schema (name not string), should return false", function() {
    let input = {
      name: 23,
      workingHours: {
        "2019-03-23": "15:20"
      }
    };
    assert.equal(checker.checkValidDoctor(input), false);
  });
  it("input date doestn't match format (not YYYY-MM-DD), should return false", function() {
    let input = {
      name: "Jack",
      workingHours: {
        "12/03/23": "15:20"
      }
    };
    assert.equal(checker.checkValidDoctor(input), false);
  });
  it("input working hour doestn't match format (beyond 0-24 hour), should return false", function() {
    const input = {
      name: "Jack",
      workingHours: {
        "2019-03-23": "25:30"
      }
    };
    assert.equal(checker.checkValidDoctor(input), false);
  });
  it("input is valid, should return true", function() {
    let input = {
      name: "Jack",
      workingHours: {
        "2019-03-23": "12:18"
      }
    };
    assert.equal(checker.checkValidDoctor(input), true);
  });
});

describe("checkValidAppointments", function() {
  it("input doesn't match schema (name not string), should return false", function() {
    let input = {
      patientName: 12345,
      doctorName: "Jack",
      appointDate: "2019-03-23",
      appointTime: "17:18"
    };
    assert.equal(checker.checkValidAppointments(input), false);
  });
  it("input appointDate doesn't match schema (not YYYY-MM-DD), should return false", function() {
    let input = {
      patientName: 12345,
      doctorName: "Jack",
      appointDate: "20-03-23",
      appointTime: "17:18"
    };
    assert.equal(checker.checkValidAppointments(input), false);
  });
});

describe("isWork", function() {
  it("input time beyond a doctor's working time (not a working date), should return false", function() {
    let input = {
      patientName: "Mary",
      doctorName: "Jack",
      appointDate: "2019-03-27",
      appointTime: "08:11"
    };
    let workingHours = {
      "2019-03-23": "08:17",
      "2019-03-24": "08:17",
      "2019-03-25": "08:17"
    };
    assert.equal(checker.isWork(input, workingHours), false);
  });
  it("input time beyond a doctor's working time (not a working hour), should return false", function() {
    let input = {
      patientName: "Mary",
      doctorName: "Jack",
      appointDate: "2019-03-23",
      appointTime: "18:20"
    };
    let workingHours = {
      "2019-03-23": "08:17",
      "2019-03-24": "08:17",
      "2019-03-25": "08:17"
    };
    assert.equal(checker.isWork(input, workingHours), false);
  });
  it("input time within a doctor's working hours, should return true", function() {
    let input = {
      patientName: "Mary",
      doctorName: "Jack",
      appointDate: "2019-03-23",
      appointTime: "09:12"
    };
    let workingHours = {
      "2019-03-23": "08:17",
      "2019-03-24": "08:17",
      "2019-03-25": "08:17"
    };
    assert.equal(checker.isWork(input, workingHours), true);
  });
});

describe("isOverLap", function() {
  it("input time overlaps with one existing appointment, should return true", function() {
    let input = {
      patientName: "Mary",
      doctorName: "Jack",
      appointDate: "2019-03-24",
      appointTime: "08:11"
    };
    let appointments = [
      {
        patientName: "Tom",
        doctorName: "Jack",
        appointDate: "2019-03-24",
        appointTime: "10:11"
      },
      {
        patientName: "Henry",
        doctorName: "Jack",
        appointDate: "2019-03-23",
        appointTime: "10:11"
      },
      {
        patientName: "Smith",
        doctorName: "Jack",
        appointDate: "2019-03-25",
        appointTime: "10:11"
      }
    ];
    assert.equal(checker.isOverLap(input, appointments), true);
  });
  it("input time doesn't overlaps with one existing appointment, should return false", function() {
    let input = {
      patientName: "Mary",
      doctorName: "Jack",
      appointDate: "2019-03-24",
      appointTime: "12:15"
    };
    let appointments = [
      {
        patientName: "Tom",
        doctorName: "Jack",
        appointDate: "2019-03-24",
        appointTime: "10:11"
      },
      {
        patientName: "Henry",
        doctorName: "Jack",
        appointDate: "2019-03-23",
        appointTime: "10:11"
      },
      {
        patientName: "Smith",
        doctorName: "Jack",
        appointDate: "2019-03-25",
        appointTime: "10:11"
      }
    ];
    assert.equal(checker.isOverLap(input, appointments), false);
  });
});
