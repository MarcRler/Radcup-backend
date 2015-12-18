var expect = require('expect.js');
var request = require('supertest');
var server = require('../server');
var should = require('should');
var setup = require('./setup');
var gameHelper = require('./helpers/gameHelper');
var userHelper = require('./helpers/userHelper');

describe('Games API Testsuite.', function() {
  var user = {
    username: 'MarkusMustermann',
    email: 'markus@mustermann.de',
    password: '1234'
  };
  var game = {
    adress: 'Some place',
    lat: '12345',
    lng: '56773'
  };
  before(function(ready){
    setup.setupDatabase(function(){
      server.start(function(){
        userHelper.createUser(user.username, user.email, user.password, function(){

          ready();
        });
        gameHelper.createGames(5, function(){

          ready();
        });
      });
    });
  });
    after(function(done){
      setup.teardownDatabase(function(){
        server.stop(done);
      });
    });


  it('should create a game', function(done) {
    request(server.app)
      .post('/api/games')
      .auth(user.email, user.password)
      .send( game )
      .end(function(err, res){
        expect(err).to.eql(null);
        expect(res.status).to.eql(200);
        expect(res.body.adress).to.eql(game.adress)
        done();
      });
  });

  it('should get all games', function(done) {
    request(server.app)
      .get('/api/games')
      .end(function(err, res){
        expect(err).to.eql(null);
        expect(res.status).to.eql(200);
        expect(res.body.length).to.eql(6);
        done();
      });
  });
});
