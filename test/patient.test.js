const chai = require('chai');
const expect = require('chai').expect;
chai.use(require('chai-http'));

const app = require('../app.js');

var path = "/patients"
var new_record = {
  name: "Zheng",
  appointments: []
};

describe('GET /patients', function () {
  this.timeout(5000);

  it('should return all patients', function() {
    return chai.request(app)
        .get(path)
        .then(function(res) {
          expect(res).to.have.status(200);
          expect(res).to.be.json;
          expect(res).to.be.an('object');
        });
  });

  // test invalid path
  it('should return that path is Not Found', function() {
    return chai.request(app)
        .get(path + '/RANDOM_TEXT')
        .catch(function(err) {
          expect(err).to.have.status(404);
        })
  });
})

describe('POST /patients - create new patient record', function() {
  this.timeout(5000);

  var bad_record_noName = {
    appoinments: []
  };

  var bad_record_incompleteAppointments = {
    name: "Zheng",
    appointments: [{
      doctor_name: "Seuss",
    }]
  }

  var new_record_withAppointments = {
    name: "Zheng",
    appointments: [{
      doctor_name: "Seuss",
      date: "06/24/2019"
    }]
  }

  it('should create new patient record (without appointments field)', function() {
    chai.request(app)
        .post(path)
        .set('content-type', 'application/json')
        .send(new_record, function (err, res) {
          expect(res).to.have.status(201);
        });
  });

  it('should create new patient record (with valid appointments field)', function() {
    chai.request(app)
        .post(path)
        .set('content-type', 'application/json')
        .send(new_record_withAppointments, function (err, res) {
          expect(res).to.have.status(201);
        });
  });

  it('should NOT create new patient record - no name', function() {
    chai.request(app)
        .post(path)
        .set('content-type', 'application/json')
        .send(bad_record_noName, function (err, res) {
          expect(res).to.have.status(500);
        });
  });

  it('should NOT create new patient record - incomplete appointments field', function() {
    chai.request(app)
        .post(path)
        .set('content-type', 'application/json')
        .send(bad_record_incompleteAppointments, function (err, res) {
          expect(res).to.have.status(500);
        });
  });
})

describe('GET /patients/:patientName - get patient record', function() {
  this.timeout(5000);

  it('setting things up...', function() {
    chai.request(app)
          .post(path)
          .set('content-type', 'application/json')
          .send(new_record, function (err, res) {
            expect(res).to.have.status(201);
          })
  }); 

  it('get patient record', function() {
    chai.request(app)
      .get(path + "/" + new_record['name'])
      .then(function(res) {
        expect(res).to.have.status(200);
        expect(res).to.be.an('object'); 
      });
  }); 
})

describe('DELETE /patients/:patientName - delete patient record', function() {
  this.timeout(5000);

  it('setting things up...', function() {
    chai.request(app)
          .post(path)
          .set('content-type', 'application/json')
          .send(new_record, function (err, res) {
            expect(res).to.have.status(201);
          })
  });

  it('delete patient record', function() {
    chai.request(app)
      .delete(path + "/" + new_record['name'], function(res) {
        expect(res).to.have.status(200);
      });
  }); 
})