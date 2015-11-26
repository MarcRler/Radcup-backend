var setup = require('./setup');
describe('User', function () {

  describe('Signup', function(){
    before(setup.boot);
    after(setup.shutdown);
    it('credentials are valid ',function(done){

      var profile  ={
                      username: 'swegYo4',
                      password: '1234',
                      email: 'sweg@yolo.com',
                      firstName: 'sweg',
                      lastName: 'yolo'};

      setup.superagent
          .post('http://localhost:'+setup.port+"/signup")
          .send(profile)
          .set('Accept', 'application/json')
          .end(function(err, res){
            if (err) {
              throw err;
            }
            console.log(res);
            setup.expect(err).to.eql(null)
            setup.expect(res.body.length).to.eql(1)
            setup.expect(res.body[0]._id.length).to.eql(24)
            id = res.body[0]._id
            done()
      })
    });
  });
});
