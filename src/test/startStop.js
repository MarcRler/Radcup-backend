var request = require('supertest');
var server = require('../server');
/* Teste ob Server sich 2 x starten und beenden lässt*/
describe('Server Testsuite:', function() {
  beforeEach(server.start);
  afterEach(server.stop);

  it('should start and stop the first time the node server', function(done) {
    request(server.app)
      .get('/api/')
      .expect(200, done);
  });

  it('should start and stop the second time the node server', function(done) {
    request(server.app)
      .get('/api/')
      .expect(200, done);
  });
});
