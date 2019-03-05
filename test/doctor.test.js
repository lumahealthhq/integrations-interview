const chai = require('chai');
const expect = require('chai').expect;
chai.use(require('chai-http'));

const app = require('../app.js');

var path = "/doctors"
var new_record = {
  name: "Seuss",
  working_hours: [{
    day: "Monday",
    hours_from: "8",
    hours_to: "5"
  }]
};

var new_hours = {
  day: "Monday",
  hours_from: "9",
  hours_to: "4"
};

describe('GET /doctors', function () {
  this.timeout(5000);

  // get all doctors
  it('should return all doctors', function() {
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

describe('POST /doctors - create new doctor record', function() {
  this.timeout(5000);

  var bad_record_noName = {
    working_hours: [{
      day: "Monday",
      hours_from: "8",
      hours_to: "5"
    }]
  }

  var bad_record_incompleteHours = {
    name: "Seuss",
    working_hours: [{
      hours_from: "8",
      hours_to: "5"
    }]
  }

  it('should create new doctor record', function() {
    chai.request(app)
        .post(path)
        .set('content-type', 'application/json')
        .send(new_record, function (err, res) {
          expect(res).to.have.status(201);
        });
  });

  it('should NOT create new doctor record - no name', function() {
    chai.request(app)
        .post(path)
        .set('content-type', 'application/json')
        .send(bad_record_noName, function (err, res) {
          expect(res).to.have.status(500);
        });
  });

  it('should NOT create new doctor record - incomplete working_hours', function() {
    chai.request(app)
        .post(path)
        .set('content-type', 'application/json')
        .send(bad_record_incompleteHours, function (err, res) {
          expect(res).to.have.status(500);
        });
  });
})

describe('GET /doctors/:doctorName - get doctor record', function() {
  this.timeout(5000);

  it('setting things up...', function() {
    chai.request(app)
          .post(path)
          .set('content-type', 'application/json')
          .send(new_record, function (err, res) {
            expect(res).to.have.status(201);
          })
  }); 

  it('get doctor record', function() {
    chai.request(app)
      .get(path + "/" + new_record['name'])
      .then(function(res) {
        expect(res).to.have.status(200);
        expect(res).to.be.an('object'); 
      });
  });
})

describe('DELETE /doctors/:doctorName - delete doctor record', function() {
  this.timeout(5000);

  it('setting things up...', function() {
    chai.request(app)
          .post(path)
          .set('content-type', 'application/json')
          .send(new_record, function (err, res) {
            expect(res).to.have.status(201);
          })
  });

  it('delete doctor record', function() {
    chai.request(app)
      .delete(path + "/" + new_record['name'], function(res) {
        expect(res).to.have.status(200);
      });
  });   
})

describe('PUT /doctors/:doctorName - update working hours of a doctor by doctor name', function () {
  this.timeout(5000);

  it('setting things up...', function() {
    chai.request(app)
          .post(path)
          .set('content-type', 'application/json')
          .send(new_record, function (err, res) {
            expect(res).to.have.status(201);
          })
  });

  it('update working hours of doctor', function() {
    chai.request(app)
      .put(path + "/" + new_record['name'])
      .set('content-type', 'application/json')
      .send(new_hours, function (err, res) {
        expect(res).to.have.status(200);
        expect(res).to.be.an('object'); 
      });
  });
})