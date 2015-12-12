var request = require('supertest');
var server = require('../server');

describe('Server', function() {
  beforeEach(server.start);
  afterEach(server.stop);

  it('should start and stop the first time', function(done) {
    request(server.app)
      .get('/api/')
      .expect(200, done);
  });

  it('should start and stop the second time', function(done) {
    request(server.app)
      .get('/api/')
      .expect(200, done);
  });
});
