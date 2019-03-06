let mongoose = require("mongoose");
let Booking = require('../models/booking');

let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../../app');
let should = chai.should();


chai.use(chaiHttp);

describe('Bookings', () => {
    beforeEach((done) => {
        Booking.remove({}, (err) => { 
           done();           
        });        
    });
  describe('/GET booking', () => {
      it('it should GET all the bookings', (done) => {
        chai.request(server)
            .get('/getBookingsList')
            .end((err, res) => {
                  res.should.have.status(200);
                  res.body.should.be.a('array');
                  res.body.length.should.be.eql(0);
              done();
            });
      });
  });
  /*
  * Test the /POST route
  */
  describe('/POST booking', () => {
      it('it should not POST a booking without pages field', (done) => {
          let booking = {
            doc_id:"5c7d5fc1b63e5c14bc737053",
            pat_id:"5c7d605dbdf508166faaeb6e",
            day:"Monday",
            slot:"18-19"
        }
        chai.request(server)
            .post('/booking')
            .send(booking)
            .end((err, res) => {
                  res.should.have.status(200);
                  res.body.should.be.a('object');
                  res.body.should.have.property('errors');
                  res.body.errors.should.have.property('day');
                  res.body.errors.pages.should.have.property('slot').eql('18-19');
              done();
            });
      });

  });
});