'use strict';
const chai = require('chai');
const expect = require('chai').expect;
const chai_http = require('chai-http');
const app = require('../app.js');
let id = ' ';
chai.use(chai_http);

describe('API endpoint/patients', function() {
    it('should return all patient', function() {
        return chai.request(app)
            .get('/patients')
            .then(function (res){
                expect(res).to.have.status(200);
            });
    });

    it('should create patient', function() {
        return chai.request(app)
            .post('/patients')
            .send({name:"Akash Jidda"})
            .then(function (res){
                expect(res).to.have.status(201);
            });
    });
});


