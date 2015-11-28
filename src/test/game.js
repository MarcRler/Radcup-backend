//TODO: überall auf JSON prüfen und noch weitere Logik Prüfungen einbauen


var expect = require('expect.js');
var superagent= require('superagent');
require = require('really-need');
var username='Tester4';
var email='tester4@test.de';
var password='secret';
var host='http://localhost:3000/api/'
var adress='Im Tesfall 23'
describe('Game-Testsuite', function () {
  var server;
  var userid;
  var gameid;
  var gameidnew;
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
              expect(e).to.eql(null)
              expect(res.status).to.eql(200);
              gameidnew = res.body._id;
              expect(gameidnew.length).to.eql(24)
              expect(res.body._id).to.not.eql(gameid);
              expect(res.body.userId).to.eql(userid);
              done()
          })
    });
  });
  describe('get all games' , function(){

    it('with GET: ',function(done){
      superagent.get(host+'games')
          .end(function(e, res){
              expect(e).to.eql(null)
              expect(res.status).to.eql(200);
              expect(res.body.length).to.eql(2);
              expect(res.body[1].userId).to.eql(userid);
              done()
          })
    });
  });
  describe('get -second- game' , function(){

    it('with GET by gameId: ',function(done){
      superagent.get(host+'games/'+gameidnew)
          .end(function(e, res){
              expect(e).to.eql(null)
              expect(res.body._id).to.eql(gameidnew);
              expect(res.status).to.eql(200);

              done()
          })
    });
  });
  describe('update -second- game' , function(){
 //TODO: Controller muss noch angepasst werden! 
    it('with PUT by gameId: ',function(done){
      superagent.put(host+'games/'+gameidnew)
          .send('adress=NeueAdresse')
          .end(function(e, res){
            console.log(res.body);
              expect(res.status).to.eql(200);
              expect(res.body._id).to.eql(gameidnew);
              expect(res.body.adress).to.eql('NeueAdresse')
              done()
          })
    });
  });


  describe('delete games', function(){

    it('with DELETE -first- game: ',function(done){
      superagent.del(host+'games/'+gameidnew)
          .type('form')  //Warum auch immer man form bei unserer api nehmen muss?
          .auth(email, password) // x-www-form-urlencoded
          .end(function(e, res){
              expect(e).to.eql(null)
              expect(res.status).to.eql(200);

              done()
          })
    });
    it('with GET first game should fail: ',function(done){
      superagent.get(host+'games/'+gameidnew)
          .end(function(e, res){
              expect(e).to.eql(null)
              expect(res.body).to.eql(null);
              expect(res.status).to.eql(200);
              done()
          })
    });
    it('with DELETE -second- game: ',function(done){
      superagent.del(host+'games/'+gameid)
          .type('form')  //Warum auch immer man form bei unserer api nehmen muss?
          .auth(email, password) // x-www-form-urlencoded
          .end(function(e, res){

              expect(e).to.eql(null)
              expect(res.status).to.eql(200);

              done()
          })
    });
    it('DELETE user for second testrun : ',function(done){
      superagent.del(host+'users/'+userid)
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
});
