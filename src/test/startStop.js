var setup = require('./setup');
describe('Server', function () {


  describe('boot and shutdown', function(){
    beforeEach(setup.boot);
    afterEach(setup.shutdown);
    it('start and stop first ',function(done){
      setup.superagent
        .get('http://localhost:'+setup.port)
        .end(function(err, res){
          setup.expect(res.status).to.equal(200);
          done();
      })
    });
    it('start and stop second ',function(done){
      setup.superagent
        .get('http://localhost:'+setup.port)
        .end(function(err, res){
          setup.expect(res.status).to.equal(200);
          done();
      })
    });
  });
});
