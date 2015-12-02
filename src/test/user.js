//TODO: überall auf JSON prüfen und noch weitere Logik Prüfungen einbauen

var expect = require('expect.js');
var superagent= require('superagent');
var server = require('../server');
var username='testuser27';
var email='testuser27@web.de';
var password='secret';
var host='http://localhost:3000/api/users'
describe('User-Testsuite', function () {
  beforeEach(server.start);
  afterEach(server.stop);
  describe('Testing '+username, function(){
   var userid;
    it('with POST: ',function(done){
      superagent.post(host)
          .type('form')
          .send('username='+username)
          .send('email='+email)
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
          .auth(email, password)
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
          .type('form')
          .auth(email, password)
          .send('email='+email)
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
          .type('form')
          .auth(email, password)
          .send('email='+email)
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
          .auth(email, password)
          .end(function(e, res){


              expect(res.status).to.eql(401)
              done()
          })
    });
  });
});
