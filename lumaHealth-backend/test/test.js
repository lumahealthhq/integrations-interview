var chai = require('chai'), chaiHttp = require('chai-http');

chai.use(chaiHttp);

var expect = chai.expect;

it("Should check credentials and return status code", function(done){
    chai.request('http://localhost:3001')
    .post('/login')
    .send({ "username": "admin", "password" : "admin"})
    .end(function (err, res) {
        expect(res).to.have.status(200);
        done();
    });
})


it("Should check credentials and return status code", function(done){
    chai.request('http://127.0.0.1:3001')
    .post('/create')
    .send({ "email": "saumya.goyal@sjsu.edu", "name" : "Saumya Goyal"})
    .end(function (err, res) {
        expect(res).to.have.status(200);
        done();
    });
})

 
it("Should check credentials and return status code", function(done){
    chai.request('http://127.0.0.1:3001')
    .post('/book')
    .send({ "selecteddoctor": "Shubhi Goyal", "selectedslot" : "S1", "day": { value: 'Tuesday', label: 'Tuesday' }})
    .end(function (err, res) {
        expect(res).to.have.status(200);
        done();
    });
})



