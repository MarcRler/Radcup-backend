var expect = require('expect.js');
var superagent= require('superagent');
require = require('really-need');
var username='Tester12';
var email='tester12@test.de';
var password='secret';
var host='http://localhost:3000/api/'
var adress='Im Tesfall 23'
describe('Game-Testsuite', function () {
  var server;
  var userid;
  before(function() {
    server = require('../server', { bustCache: true });
  });
  after(function (done) {
    server.close(done);
  });
  describe('Create a user: '+username, function(){
    it('with POST: ',function(done){
      superagent.post(host+'users')
          .type('form')  //Warum auch immer man form bei unserer api nehmen muss?
          .send('username='+username) // x-www-form-urlencoded
          .send('email='+email) // liegt das am Body parser?
          .send('password='+password)
          .end(function(e, res){
              console.log(res.body);
              expect(e).to.eql(null)
              expect(res.status).to.eql(200);
              expect(res.body.username).to.eql(username);
              expect(res.body.email).to.eql(email);
              userid = res.body._id;
              expect(userid.length).to.eql(24)
              done()
          })
    });
  });
  describe('Create -first- game as '+username, function(){

    it('with POST: ',function(done){
      superagent.post(host+'games')
          .type('form')  //Warum auch immer man form bei unserer api nehmen muss?
          .auth(email, password) // x-www-form-urlencoded
          .send('adress='+adress)
          .end(function(e, res){
              console.log(res.body);
              console.log(userid);
              expect(e).to.eql(null)
              expect(res.status).to.eql(200);
              gameid = res.body._id;
              expect(gameid.length).to.eql(24)
              expect(res.body.userId).to.eql(userid); //TODO
              done()
          })
    });
  });
  describe('Create -second- game as '+username, function(){

    it('with POST: ',function(done){
      superagent.post(host+'games')
          .type('form')  //Warum auch immer man form bei unserer api nehmen muss?
          .auth(email, password) // x-www-form-urlencoded
          .send('adress='+adress)
          .end(function(e, res){
              console.log(res.body);
              console.log(userid);
              expect(e).to.eql(null)
              expect(res.status).to.eql(200);
              gameid = res.body._id;
              expect(gameid.length).to.eql(24)
              expect(res.body.userId).to.eql(userid); //TODO
              done()
          })
    });
  });

});
