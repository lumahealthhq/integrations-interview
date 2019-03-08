import chai from "chai";
import chaiHttp from "chai-http";
import app from "../../";
const working_hours = require("../../models").working_hours;
chai.should();
chai.use(chaiHttp);

describe("/PUT/: updating workinghours", () => {
  it("should update the working hours based doctor id", done => {
    const DoctorId = 10;
    chai
      .request(app)
      .put("/api/update/workinghours/" + DoctorId)
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
