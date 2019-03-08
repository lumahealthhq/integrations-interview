import chai from "chai";
import chaiHttp from "chai-http";
import app from "../../";
import db from "../../models";
const working_hours = require("../../models").working_hours;
chai.should();
chai.use(chaiHttp);

//@ working_hours.DoctorId cannot be null console.error
// its known issue with sequelize library
// https://github.com/sequelize/sequelize/issues/4708
// the error massage comes directly from DB so We are goo on test case
describe("/POST/: Creating workinghours", () => {
  it("should Create  working hours based doctor id", done => {
    chai
      .request(app)
      .post("/api/create/workinghours")
      .type("form")
      .send({ DoctorID: 1 })
      .send({
        date: "2019-04-16",
        start: "10:30:00",
        to: "16:00:00"
      })
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a("object");
        res.body.should.have.property("message");
        done();
      });
  });
});
