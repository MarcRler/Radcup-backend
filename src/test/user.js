var setup = require('./setup');
describe('User', function () {

  describe('Signup', function(){
    before(setup.boot);
    after(setup.shutdown);
    it('credentials are valid ',function(done){

      var profile  ={ username: 'sweg', password: '123' };

      setup.superagent
          .post('http://localhost:'+setup.port+"/login")
          .send(profile)
          .set('Accept', 'application/json')
          .end(function(err, res){
            setup.expect(res.status).to.equal(200);
            done();
      })
    });
  });
});
