import chai from "chai";
import chaiHttp from "chai-http";
import app from "../../";
import db from "../../models";
const appointments = require("../../models").appointments;
chai.should();
chai.use(chaiHttp);

//@ working_hours.DoctorId cannot be null console.error
// its known issue with sequelize library
// https://github.com/sequelize/sequelize/issues/4708
// the error massage comes directly from DB so We are goo on test case
describe("/POST/: booking an appointment", () => {
  it("should Create  working hours based doctor id", done => {
    chai
      .request(app)
      .post("/api/schedule")
      .type("form")
      .send({
        appointment_date: "2019-08-09",
        appointment_start_time: "11:00:00",
        appointment_end_time: "12:00:00",
        DoctorId: 10,
        patientId: 20
      })
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a("object");
        res.body.should.have.property("message");
        done();
      });
  });
});
