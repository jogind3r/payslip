'use strict';

const chai = require('chai');
const expect = require('chai').expect;
const assert = require('chai').assert;

chai.use(require('chai-http'));

const app = require('../src/app.js');

const sampleData = {
    paymentPeriod: '31 march',
    firstName: 'Andrew',
    lastName: 'Smith',
    annualSalary: '60050',
    superRate: '9'
};

const sampleOutput = {
    name: 'Andrew Smith',
    'pay-period': '31 march',
    'gross-income': '5004',
    'income-tax': '922',
    'net-income': '4082',
    'super-amount': '450'
};

describe('API endpoint /payslip', function() {
    it('should return IncomeTax slip with 200 status', function() {
        return chai
            .request(app)
            .post('/payslip')
            .set('content-type', 'application/x-www-form-urlencoded')
            .send(sampleData)
            .then(function(res) {
                expect(res).to.have.status(200);
                expect(res).to.be.json;
            });
    });

    it('should be equal to sample output', function() {
        return chai
            .request(app)
            .post('/payslip')
            .set('content-type', 'application/x-www-form-urlencoded')
            .send(sampleData)
            .then(function(res) {
                expect(res.body).to.deep.equal(sampleOutput);
            })
            .catch(function(err) {
                expect(err).to.have.status(400);
            });
    });

    // GET - Invalid path
    it('should return Not Found', function() {
        return chai
            .request(app)
            .get('/example')
            .then(function(res) {
                // throw new Error('Path exists!');
                expect(res).to.have.status(404);
            })
            .catch(function(err) {
                expect(err).to.have.status(404);
            });
    });

    // POST - Bad Request
    it('should return Bad Request - First Name value not present', function() {
        return chai
            .request(app)
            .post('/payslip')
            .type('form')
            .send({
                paymentPeriod: '31 march',
                lastName: 'Smith',
                annualSalary: '60050',
                superRate: '9'
            })
            .then(function(res) {
                expect(res).to.have.status(400);
            })
            .catch(function(err) {
                expect(err).to.have.status(400);
            });
    });
    it('should return Bad Request - Last Name value not present', function() {
        return chai
            .request(app)
            .post('/payslip')
            .type('form')
            .send({
                paymentPeriod: '31 march',
                FirstName: 'Smith',
                annualSalary: '60050',
                superRate: '9'
            })
            .then(function(res) {
                expect(res).to.have.status(400);
            })
            .catch(function(err) {
                expect(err).to.have.status(400);
            });
    });
    it('should return Bad Request - Salary value not present', function() {
        return chai
            .request(app)
            .post('/payslip')
            .type('form')
            .send({
                paymentPeriod: '31 march',
                firstName: 'Andrew',
                lastName: 'Smith',
                superRate: '9'
            })
            .then(function(res) {
                expect(res).to.have.status(400);
            })
            .catch(function(err) {
                expect(err).to.have.status(400);
            });
    });
    it('should return Bad Request - Rate value not present', function() {
        return chai
            .request(app)
            .post('/payslip')
            .type('form')
            .send({
                paymentPeriod: '31 march',
                firstName: 'Andrew',
                lastName: 'Smith',
                annualSalary: '60050'
            })
            .then(function(res) {
                expect(res).to.have.status(400);
            })
            .catch(function(err) {
                expect(err).to.have.status(400);
            });
    });
    it('should return Bad Request - Payment period value not present', function() {
        return chai
            .request(app)
            .post('/payslip')
            .type('form')
            .send({
                firstName: 'Andrew',
                lastName: 'Smith',
                annualSalary: '60050',
                superRate: '9'
            })
            .then(function(res) {
                expect(res).to.have.status(400);
            })
            .catch(function(err) {
                expect(err).to.have.status(400);
            });
    });
    it('should return Bad Request - Contains -ve salary value', function() {
        return chai
            .request(app)
            .post('/payslip')
            .type('form')
            .send({
                firstName: 'Andrew',
                lastName: 'Smith',
                annualSalary: '-60050',
                superRate: '9'
            })
            .then(function(res) {
                expect(res).to.have.status(400);
            })
            .catch(function(err) {
                expect(err).to.have.status(400);
            });
    });
    it('should return Bad Request - Contains -ve rate value', function() {
        return chai
            .request(app)
            .post('/payslip')
            .type('form')
            .send({
                firstName: 'Andrew',
                lastName: 'Smith',
                annualSalary: '60050',
                superRate: '-9'
            })
            .then(function(res) {
                expect(res).to.have.status(400);
            })
            .catch(function(err) {
                expect(err).to.have.status(400);
            });
    });
    it('should return Bad Request - Salary value not numeric', function() {
        return chai
            .request(app)
            .post('/payslip')
            .type('form')
            .send({
                firstName: 'Andrew',
                lastName: 'Smith',
                annualSalary: 'sample',
                superRate: '9'
            })
            .then(function(res) {
                expect(res).to.have.status(400);
            })
            .catch(function(err) {
                expect(err).to.have.status(400);
            });
    });
    it('should return Bad Request - Rate value not numeric', function() {
        return chai
            .request(app)
            .post('/payslip')
            .type('form')
            .send({
                firstName: 'Andrew',
                lastName: 'Smith',
                annualSalary: '60050',
                superRate: 'sample'
            })
            .then(function(res) {
                expect(res).to.have.status(400);
            })
            .catch(function(err) {
                expect(err).to.have.status(400);
            });
    });
});
