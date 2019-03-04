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
      startTime: 28800,
      endTime: 61200
    },
    {
      date: "2019-03-03",
      startTime: 28800,
      endTime: 61200
    },
    {
      date: "2019-03-04",
      startTime: 28800,
      endTime: 61200
    }
  ]
};

const patient = {
    name: "Test Patient"
};

const appointmentDate = "2019-03-02";

describe("API tests", () => {
  describe("Appointments", () => {
    let docId;
    let patientId;
    let appointmentId;
    let appointment;
    before((done) => {
      chai.request(app)
          .post("/doctors")
          .send(doctor)
          .then((res) => {
            res.should.have.status(201);
            res.body.name.should.be.eql(doctor.name);
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
        .send({docId: docId, patientId: patientId, date: appointmentDate, startTime: 28800, endTime: 32400})
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
      .get("/appointments?docId="+docId+"&date="+appointmentDate)
      .then((res) => {
        res.should.have.status(200);
        res.body.length.should.be.eql(1);
        res.body[0].patientId.should.be.eql(patientId);
        appointmentId = res.body[0]._id;
        done();
      }).catch((error) => {
        console.error(error);
      });
    });

    it("should get a single Appointment",(done)=> {
      chai.request(app)
      .get("/appointments/" + appointmentId)
      .then((res) => {
        res.should.have.status(200);
        res.body.patientId.should.be.eql(patientId);
        res.body._id.should.be.eql(appointmentId);
        appointment = res.body;
        done();
      }).catch((error) => {
        console.error(error);
      });
    });

    it("should update a Appointment",(done)=> {
      var new_appointment = {docId: docId, patientId: patientId, date: "2019-03-04", startTime: 28800, endTime: 32400};
      chai.request(app)
      .patch("/appointments/" + appointmentId)
      .send(new_appointment)
      .then((res) => {
        res.should.have.status(200);
        console.log(res.body);
        res.body.message.should.be.eql("Appointment successfully updated");
        chai.request(app)
        .get("/appointments?docId="+docId+"&date="+new_appointment.date)
        .then((res) => {
          res.should.have.status(200);
          res.body.length.should.be.eql(1);
          res.body[0].patientId.should.be.eql(patientId);
          var resDate = new Date(res.body[0].date).toString();
          resDate.should.be.eql(new Date(new_appointment.date).toString());
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
