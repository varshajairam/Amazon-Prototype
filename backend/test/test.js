/* global it */
const chai = require('chai');
const chaiHttp = require('chai-http');

chai.use(chaiHttp);

const { expect } = chai;

it('Positive Test Should check credentials and return status code', (done) => {
    chai.request('http://127.0.0.1:3001')
        .post('/auth/login')
        .send({ password: 'password', username: 'admin@amazon.com' })
        .end((err, res) => {
            expect(res).to.have.status(200);
            done();
        });
});

it('Negative Test Should should check for invalid login', (done) => {
    chai.request('http://127.0.0.1:3001')
        .post('/auth/login')
        .send({ password: '12345', username: 'test@test.com' })
        .end((err, res) => {
            expect(res).to.have.status(401);
            done();
        });
});

it('Negative Signup Test', (done) => {
    chai.request('http://127.0.0.1:3001')
        .post('/auth/register')
        .send({
            email: 'test@test.com',
            password: 'test',
            name: 'Test User'
        })
        .end((err, res) => {
            expect(res).to.have.status(400);
            done();
        });
});

it('GET products successfully', (done) => {
    chai.request('http://127.0.0.1:3001')
        .get('/product/')
        .end((err, res) => {
            expect(res.body.total).to.greaterThan(1);
            done();
        });
});

it('GET seller list', (done) => {
    chai.request('http://127.0.0.1:3001')
        .get('/users/getSellers')
        .end((err, res) => {
            expect(res).to.have.status(200);
            done();
        });
});
