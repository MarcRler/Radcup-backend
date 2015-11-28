//TODO: überall auf JSON prüfen und noch weitere Logik Prüfungen einbauen

var expect = require('expect.js');
var superagent= require('superagent');
require = require('really-need');
var username='testuser27';
var email='testuser27@web.de';
var password='secret';
var host='http://localhost:3000/api/users'
describe('User-Testsuite', function () {
  var server;
  before(function() {
    server = require('../server', { bustCache: true });
  });
  after(function (done) {
    server.close(done);
  });
  describe('Testing '+username, function(){
   var userid;
    it('with POST: ',function(done){
      superagent.post(host)
          .type('form')  //Warum auch immer man form bei unserer api nehmen muss?
          .send('username='+username) // x-www-form-urlencoded
          .send('email='+email) // liegt das am Body parser?
          .send('password='+password)
          .end(function(e, res){
              expect(e).to.eql(null)
              expect(res.status).to.eql(200);
              expect(res.body.username).to.eql(username);
              expect(res.body.email).to.eql(email);
              var id = res.body._id;
              expect(id.length).to.eql(24)
              done()
          })
    });
  });
  describe('Testing '+username, function(){

    it('with GET: ',function(done){
      superagent.get(host+'/'+email)
          .type('form')  //Warum auch immer man form bei unserer api nehmen muss?
          .auth(email, password) // x-www-form-urlencoded
          .end(function(e, res){
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
  describe('Testing '+username, function(){

    it('with PUT: ',function(done){
      username='neuerUsername'
      superagent.put(host+'/'+userid)
          .type('form')  //Warum auch immer man form bei unserer api nehmen muss?
          .auth(email, password) // x-www-form-urlencoded
          .send('email='+email) // liegt das am Body parser?
          .send('username='+username)
          .send('password='+password)
          .end(function(e, res){
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
  describe('Testing '+username, function(){

    it('with DELETE: ',function(done){
      username='neuerUsername'
      superagent.del(host+'/'+userid)
          .type('form')  //Warum auch immer man form bei unserer api nehmen muss?
          .auth(email, password) // x-www-form-urlencoded
          .send('email='+email) // liegt das am Body parser?
          .send('username='+username)
          .send('password='+password)
          .end(function(e, res){
              expect(e).to.eql(null)
              expect(res.status).to.eql(200);
              expect(res.body.username).to.eql(username);
              expect(res.body.email).to.eql(email);
              var id = res.body._id;
              expect(id.length).to.eql(24)
              done()
          })
    });
  });
  describe('Testing '+username, function(){

    it('with GET after DELETE should fail! ',function(done){
      superagent.get(host+'/'+email)
          .type('form')  //Warum auch immer man form bei unserer api nehmen muss?
          .auth(email, password) // x-www-form-urlencoded
          .end(function(e, res){


              expect(res.status).to.eql(401)
              done()
          })
    });
  });
});
