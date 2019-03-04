const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../index');
const should = chai.should();

const knex = require('../knex').knex
const async = require('async');

chai.use(chaiHttp);

const truncApp = (next) => {
  knex('appointments').truncate().asCallback((err, res) => {
    return next();
  });
} 
const truncSchedule = (next) => {
  knex('schedule').truncate().asCallback((err, res) => {
    return next();
  });
} 
const truncDoctors = (next) => {
  knex('doctors').truncate().asCallback((err, res) => {
    return next();
  });
} 
const truncPatients = (next) => {
  knex('patients').truncate().asCallback((err, res) => {
    return next();
  });
} 

describe('Schedule & Appointment', () => {

  // Clear the DB before running tests
  before((done) => {
    async.parallel([
      truncApp,
      truncSchedule,
      truncDoctors,
      truncPatients
    ], (err) => {
      done();
    })
  })

  describe('/POST doctor', () => {
    it('it should CREATE a new doctor', (done) => {
      doc = {
        name : 'Test Doctor'
      }
      chai.request(server)
          .post('/doctor')
          .send(doc)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('array');
            done();
          })
    })
  })
  
  describe('/GET doctor', () => {
    it('it should GET all the doctors', (done) => {
      chai.request(server)
          .get('/doctor')
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('array');
            res.body.length.should.be.above(0);
            done();
          })
    })
  })
  
  describe('/UPDATE doctor', () => {
    it('it should GET all the doctors', (done) => {
      doc = {
        name : 'New Name'
      }
      chai.request(server)
          .post('/doctor/1')
          .send(doc)
          .end((err, res) => {
            res.should.have.status(200);
            done();
          })
    })
  })

  describe('/POST patient', () => {
    it('it should CREATE a new patient', (done) => {
      p = {
        name : 'Test Patient'
      }
      chai.request(server)
          .post('/patient')
          .send(p)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('array');
            done();
          })
    })
  })

  describe('/POST Schedule', () => {
    it('it should Create 8 slots for new appointments', (done) => {
      schedule = {
        doctor_id: 1,
        date: '2019-03-03 08:00:00',
        slots: 8,
        duration: 15
      }
      chai.request(server)
          .post('/schedule')
          .send(schedule)
          .end((err, res) => {
            res.should.have.status(200);
            done();
          })
    })
  })
  
  describe('/GET Schedule', () => {
    it('it should GET all the schedule', (done) => {
      chai.request(server)
          .get('/schedule')
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('array');
            res.body.length.should.be.above(7)
            done();
          })
    })
  })

  describe('/POST Appointment', () => {
    it('it should CREATE a new appointment', (done) => {
      appt = {
        patient_id: 1,
        schedule_id: 1,
      }
      chai.request(server)
          .post('/appointment')
          .send(appt)
          .end((err, res) => {
            res.should.have.status(200);
            done();
          })
    })
  })
  
  describe('/GET Schedule', () => {
    it('it should GET the associated schedule and check its status', (done) => {
      chai.request(server)
          .get('/schedule?id=1')
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('array');
            res.body[0].status.should.be.eql(1)
            done();
          })
    })
  })
  
  describe('/DELETE Appointment', () => {
    it('it should DELETE the appointment', (done) => {
      chai.request(server)
          .delete('/appointment/1')
          .end((err, res) => {
            res.should.have.status(200);
            done();
          })
    })
  })
})





