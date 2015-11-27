var request = require('supertest');
require = require('really-need');

describe('loading express', function () {
  var server;
  beforeEach(function () {
    server = require('../server', { bustCache: true });
  });
  afterEach(function (done) {
    server.close(done);
  });

  it('start and stop the first time', function testSlash(done) {
    request(server)
      .get('/api/')
      .expect(200, done);
  });
  // it('start and stop the second time', function testSlash(done) {
  //   request(server)
  //     .get('/api/')
  //     .expect(200, done);
  // });
});
