const request = require('request');
const should = require('should');

const Server = require('../server');
const config = require(`../config_${process.env.NODE_ENV}.json`);

const BASE_URL = `http://${config.server.host}:${config.server.port}`;


const beforeHook = async () => {
    global.server = new Server();
    await server.init();
    server.start();
};

const afterHook = () => {
    global.server.stop();
};

describe('Numbers', function () {

    before(beforeHook);

    after(afterHook);

    it('numbers division success', (done) => {
        request(`${BASE_URL}/numbers_division?a=4&b=2`, (error, response, body) => {
            response.statusCode.should.eql(200);
            body = JSON.parse(body);
            body.should.eql({ res: 2});
            done();
        });
    });

    it('numbers division without property', (done) => {
        request(`${BASE_URL}/numbers_division?a=4`, (error, response) => {
            response.statusCode.should.eql(400);
            done();
        });
    });

    it('numbers division with wrong property', (done) => {
        request(`${BASE_URL}/numbers_division?a=qwe&b=3`, (error, response) => {
            response.statusCode.should.eql(400);
            done();
        });
    });

    it('numbers sqrt success', (done) => {
        request.post(`${BASE_URL}/numbers_sqrt`, {json: [1, 9, 4]}, (error, response, body) => {
            response.statusCode.should.eql(200);
            body.should.eql({res: [1, 3, 2]});
            done();
        });
    });

    it('numbers sqrt with empty body', (done) => {
        request.post(`${BASE_URL}/numbers_sqrt`, (error, response) => {
            response.statusCode.should.eql(400);
            done();
        });
    });

    it('numbers sqrt with wrong item', (done) => {
        request.post(`${BASE_URL}/numbers_sqrt`, {json: [1, 9, 'qwe']}, (error, response) => {
            response.statusCode.should.eql(400);
            done();
        });
    });

    it('numbers sqrt with wrong body', (done) => {
        request.post(`${BASE_URL}/numbers_sqrt`, {json: {1: 9}}, (error, response) => {
            response.statusCode.should.eql(400);
            done();
        });
    });
});

