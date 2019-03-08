import chai from "chai";
import chaiHttp from "chai-http";
import app from "../../";
const Doctor = require("../../models").Doctor;
chai.should();
chai.use(chaiHttp);

describe("/GET All Doctors", () => {
  it("it should Get all doctors", done => {
    chai.request(app).get("/api/doctors/all").end((err, res) => {
      res.should.have.status(200);
      res.body.should.be.a("Array");
      done();
    });
  });
});
