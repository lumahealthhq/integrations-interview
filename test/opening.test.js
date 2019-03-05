const chai = require('chai');
const expect = require('chai').expect;
chai.use(require('chai-http'));

const app = require('../app.js');

var path = "/openings"
var new_record = {
  doctor_name: "Seuss",
  month: 6,
  day: 24, 
  year: 2019
};

describe('GET /openings', function () {
  this.timeout(5000);

  // get all openings
  it('should return all openings', function() {
    return chai.request(app)
        .get(path)
        .then(function(res) {
          expect(res).to.have.status(200);
          expect(res).to.be.json;
          expect(res).to.be.an('object');
        });
  })

  // test invalid path
  it('should return that path is Not Found', function() {
    return chai.request(app)
        .get(path + '/RANDOM_TEXT')
        .catch(function(err) {
          expect(err).to.have.status(404);
        })
  });
})

describe('POST /openings/new - create new opening', function() {
  this.timeout(5000);

  var bad_record_noDoctorName = {
    month: 6,
    day: 24, 
    year: 2019
  }

  var bad_record_noMonth = {
    doctor_name: "Seuss",
    day: 24, 
    year: 2019
  }

  var bad_record_noDay = {
    doctor_name: "Seuss",
    month: 6,
    year: 2019
  }

  var bad_record_noYear = {
    doctor_name: "Seuss",
    day: 24, 
    month: 6
  }

  it('should create new opening', function() {
    chai.request(app)
        .post(path + "/new")
        .set('content-type', 'application/json')
        .send(new_record, function (err, res) {
          expect(res).to.have.status(201);
        });
  });

  it('should NOT create new opening - no doctor_name', function() {
    chai.request(app)
        .post(path + "/new")
        .set('content-type', 'application/json')
        .send(bad_record_noDoctorName, function (err, res) {
          expect(res).to.have.status(500);
        });
  });

  it('should NOT create new opening - no month', function() {
      chai.request(app)
          .post(path + "/new")
          .set('content-type', 'application/json')
          .send(bad_record_noMonth, function (err, res) {
            expect(res).to.have.status(500);
          });
    });

  it('should NOT create new opening - no day', function() {
      chai.request(app)
          .post(path + "/new")
          .set('content-type', 'application/json')
          .send(bad_record_noDay, function (err, res) {
            expect(res).to.have.status(500);
          });
    });

  it('should NOT create new opening - no year', function() {
      chai.request(app)
          .post(path + "/new")
          .set('content-type', 'application/json')
          .send(bad_record_noYear, function (err, res) {
            expect(res).to.have.status(500);
          });
    });
})

describe('POST /openings/book - book opening', function() {
  this.timeout(5000);

  var opening = {
    day: 24,
    month: 6,
    year: 2019,
    patient_name: "Zheng",
    doctor_name: "Seuss"
  }

  var bad_record_noDay = {
    month: 6,
    year: 2019,
    patient_name: "Zheng",
    doctor_name: "Seuss"
  }

  var bad_record_noPatientName = {
    day: 24,
    month: 6,
    year: 2019,
    doctor_name: "Seuss"
  }

  var bad_record_noDoctorName = {
    day: 24,
    month: 6,
    year: 2019,
    patient_name: "Zheng"
  }

  it('setting things up...', function() {
    chai.request(app)
          .post(path + "/new")
          .set('content-type', 'application/json')
          .send(new_record, function (err, res) {
            expect(res).to.have.status(201);
          })
  }); 

  it('book an existing opening', function() {
    chai.request(app)
      .post(path + "/book")
      .set('content-type', 'application/json')
      .send(opening, function(res) {
        expect(res).to.have.status(200);
        expect(res).to.be.an('object'); 
      });
  });

  it('should NOT book a non-existing opening', function() {
    opening['day'] = 20

    chai.request(app)
      .post(path + "/book")
      .set('content-type', 'application/json')
      .send(opening, function(res) {
        expect(res).to.have.status(500);
        expect(res).to.be.an('object'); 
      });
  });

  it('should NOT book opening - no day', function() {
      chai.request(app)
          .post(path + "/new")
          .set('content-type', 'application/json')
          .send(bad_record_noDay, function (err, res) {
            expect(res).to.have.status(500);
          });
    });

  it('should NOT book opening - no patient_name', function() {
      chai.request(app)
          .post(path + "/new")
          .set('content-type', 'application/json')
          .send(bad_record_noPatientName, function (err, res) {
            expect(res).to.have.status(500);
          });
    });

  it('should NOT book opening - no doctor_name', function() {
      chai.request(app)
          .post(path + "/new")
          .set('content-type', 'application/json')
          .send(bad_record_noDoctorName, function (err, res) {
            expect(res).to.have.status(500);
          });
    });
})

describe('POST /openings/book - don\'t book opening (no valid patient record)', function() {
  var bad_record = {
    doctor_name: "Seuss",
    patient_name: "Zheng",
    month: 6,
    day: 24,
    year: 2019
  }

  it('should NOT book opening - no valid patient found', function() {
      chai.request(app)
          .post(path + "/book")
          .set('content-type', 'application/json')
          .send(bad_record, function (err, res) {
            expect(res).to.have.status(500);
          });
    });
})

describe('DELETE /openings - delete opening', function() {
  this.timeout(5000);

  var opening = {
    doctor_name: "Seuss",
    month: 6,
    day: 24, 
    year: 2019
  };

  it('setting things up...', function() {
    chai.request(app)
          .post(path + "/new")
          .set('content-type', 'application/json')
          .send(new_record, function (err, res) {
            expect(res).to.have.status(201);
          })
  });

  it('delete an opening', function() {
    chai.request(app)
      .delete(path)
      .set('content-type', 'application/json')
      .send(opening, function(res) {
        expect(res).to.have.status(200);
      });
  });   
})