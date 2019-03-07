
//During the test the env variable is set to test
//process.env.NODE_ENV = 'test';
let mongoose = require("mongoose");
let AppointmentDetail = require('../src/Models/AppointmentDetailsModel');
let DoctorDetail = require('../src/Models/DoctorDetailsModel');
let PatientDetail = require('../src/Models/PatientDetailsModel');


const Doctor_Detail_model = mongoose.model('Doctor_Detail');
const Patient_Detail_model = mongoose.model('Patient_Detail');
const Appointment_Detail_model = mongoose.model('Appointment_Detail');

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../app');
let should = chai.should();

chai.use(chaiHttp);

//Our parent block
describe('AppointmentScheduler', () => {
	beforeEach((done) => { //Before each test we empty the database
		Appointment_Detail_model.remove({}, (err) => { 	   
        });
        Doctor_Detail_model.remove({}, (err) => { 	   
         });
         Patient_Detail_model.remove({}, (err) => { 	   
         });
         done();	
	});
 
 /*
  * Test the /POST route
  */
 describe('/POST AddDoctor', () => {
  it('it should add new Doctor Details in the data base', (done) => {

        let Doctor = new Doctor_Detail_model({
            // Create the new object and save it in DB
            Doctor_email: "hiteshka@buffalo.edu",
            Speciality: "ENT",
            Availabilty: [{"Day" : "1/1/1 0:0:0", "Available" : "YES"}, 
            {"Day" : "2/1/2 0:0:0", "Available" : "NO"}] });

    chai.request(server)
      .post('/AddDoctor')
      .send(Doctor)
      .end((err, res) => {
        should.exist(res.body);
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('Doctor_email');
        res.body.should.have.property('Speciality');
        done();
      });
  });
});
 /*
  * Test the /GET route
  */
 describe('/GET/:Email getWorkingHoursDoctor', () => {
  it('it should GET the Working hours of Doctor with Availability Information', (done) => {

      let Doctor = new Doctor_Detail_model({
          // Create the new object and save it in DB
          Doctor_email: "hiteshka@buffalo.edu",
          Speciality: "ENT",
          Availabilty: [{"Day" : "1/1/1 0:0:0", "Available" : "YES"}, 
          {"Day" : "2/1/2 0:0:0", "Available" : "NO"}] });
          Doctor.save((err, doctor) => {
            
      chai.request(server)
      .get('/getWorkingHoursDoctor/' + Doctor.Doctor_email)
      .send(Doctor.Availabilty)
      .end((err, res) => {
          should.exist(res.body);
          res.should.have.status(200);
          res.body.should.be.a('Array');
          done();
        });
      });
  });
});

 /*
  * Test the /POST route
  */
 describe('/POST bookWorkingHoursDoctor', () => {
  it('it should check if the doctor is available and if yes then it close' +
   'that slot and create the new appointment in appointment collection', (done) => {

        let Doctor = new Doctor_Detail_model({
            // Create the new object and save it in DB
            Doctor_email: "hiteshka@buffalo.edu",
            Speciality: "ENT",
            Availabilty: [{"Day" : "1/1/1 0:0:0", "Available" : "YES"}, 
            {"Day" : "2/1/2 0:0:0", "Available" : "NO"}] });

    chai.request(server)
      .post('/AddDoctor')
      .send(Doctor)
      .end((err, res) => {
        should.exist(res.body);
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('Doctor_email');
        res.body.should.have.property('Speciality');
        done();
      });
  });
});

/*
  * Test the /POST route
  */
 describe('/POST createUpdateWorkingHoursDoctor', () => {
  it('it should create the Working hours and availability of Doctor' +
  'in case if the doctor already has the working hours and date scheduled then' +
   'it should update the schedule with new availabilty', (done) => {

      let Doctor = new Doctor_Detail_model({
        // Create the new object and save it in DB
        Doctor_email: "hiteshka@buffalo.edu",
        Speciality: "ENT",
        Availabilty: [{"Day" : "1/1/1 0:0:0", "Available" : "YES"}, 
        {"Day" : "2/1/2 0:0:0", "Available" : "NO"}] });

    Doctor.save((err, doctor) => {
    chai.request(server)
    .post('/getWorkingHoursDoctor/' + Doctor.Doctor_email)
    .set('content-type', 'application/x-www-form-urlencoded')
    .send({Doctor_email:'hiteshka@buffalo.edu',
      NO:'2001-01-02 20:00:00.00',
      NO:'2001-01-02 21:00:00.00',
      NO:'2001-01-02 22:00:00.00',
      NO:'2001-01-02 23:00:00.00',
      YES:'2001-01-02 23:20:00.00',
      YES:'2001-01-02 14:00:00.00',
      YES:'2001-01-02 15:00:04.00',
      YES:'2001-01-02 16:00:40.00',
      YES:'2001-01-02 17:00:03.00',
      NO:'2001-01-02 23:00:02.00',
      YES:'2001-01-02 23:20:10.00',
      YES:'2001-01-02 14:00:20.00',
      YES:'2001-01-02 15:00:40.00'})
    .end((err, res) => {
        Doctor_Detail_model.find({
          "Doctor_email": "hiteshka@buffalo.edu"
        })
        done();
      });
    });
  });
});

});