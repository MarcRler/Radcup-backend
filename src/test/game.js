var expect = require('expect.js');
var request = require('supertest');
var server = require('../server');
var should = require('should');
var setup = require('./setup');
var gameHelper = require('./helpers/gameHelper');
var userHelper = require('./helpers/userHelper');

describe('Games', function() {
  var user = {
    username: 'MarkusMustermann',
    email: 'markus@mustermann.de',
    pwd: '1234'
  };
  var game = {
    adress: 'Some place'
  };
  before(function(){
    server.start();
    setup.setupDatabase();
    userHelper.createUser(user.username, user.email, user.pwd);
    gameHelper.createGames(1);
  });

  after(function(){
    setup.teardownDatabase();
    server.stop();
  });

  it('should create a game', function(done) {
    request(server.app)
      .post('api/games')
      .auth(user.email, user.pwd)
      .send( { adress: game.adress } )
      .end(function(err, res){
        expect(err).to.eql(null);
        expect(ers.status).to.eql(200);
        expect(res.body.game.adress).to.eql(adress)
        done();
      });
  });

  it('should get all games', function(done) {
    request(server.app)
      .get('/api/games')
      .end(function(err, res){
        expect(err).to.eql(null);
        expect(res.status).to.eql(200);
        expect(res.body.length).to.eql(2);
        done();
      });
  });
});
