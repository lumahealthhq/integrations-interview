process.env.NO

let Doctor = require('./models/doctor.model');
let app = require('./app');
let chai = require('chai');
let chaiHttp = require('chai-http');
let should = chai.should();

chai.use(chaiHttp);

describe('Doctors', () => {
    Doctor.remove({}, err => { 
        if (err) console.log(err); 
    });

    describe('/GET doctor', () => {
        it('should READ all the doctors', (done) => {
            chai.request(app)
                .get('/doctors/all')
                .end((err, res) => {
                    console.log(res.body, "******");
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    res.body.length.should.be.eql(0);
                done();
                });
        });
    });

    describe('/POST doctor', () => {
        it('should not CREATE a doctor without a name', (done) => {
            let name = '';
            chai.request(app)
                .post('/doctors/add')
                .send({name: name})
                .end((err, res) => {
                        res.should.have.status(200);
                        res.body.should.be.a('object');
                        res.body.should.have.property('error');
                    done();
            });
        });

        let id;
        let name = "Dr. Peter Pietzer";
        it('should CREATE a doctor on providing a name', (done) => {
            chai.request(app)
                .post('/doctors/add')
                .send({name: name})
                .end((err, res) => {
                        id = res.body._id;
                        res.should.have.status(200);
                        res.body.should.be.a('object');
                        res.body.should.have.property('name');
                        res.body.should.have.property('availableHours');
                    done();
            });
        });

        it('should book an appointment and UPDATE the doctor\'s working hours', (done) => {
            let start = "09:00",
                end = "09:30",
                day = "Monday";
            let appointment = {
                id: id,
                start: start,
                end: end,
                day: day
            }; 
            chai.request(app)
                .put('/doctors/bookappointment')
                .send(appointment)
                .end((err, res) => {
                        res.should.have.status(200);
                        res.body.should.be.a('object');
                        res.body.should.have.property('_id');
                        res.body.should.have.property('doctor').eql(name);
                        res.body.should.have.property('start').eql(start);
                        res.body.should.have.property('end').eql(end);
                        res.body.should.have.property('day').eql(day);
                    done();
            });
        });

        it('should NOT book an appointment on weekends', (done) => {
            let start = "09:00",
                end = "09:30",
                day = "Saturday";
            let appointment = {
                id: id,
                start: start,
                end: end,
                day: day
            }; 
            chai.request(app)
                .put('/doctors/bookappointment')
                .send(appointment)
                .end((err, res) => {
                        res.should.have.status(200);
                        res.body.should.be.a('object');
                        res.body.should.have.property('error');
                    done();
            });
        });
    });

    Doctor.remove({}, err => { 
        if (err) console.log(err); 
    }); 

});