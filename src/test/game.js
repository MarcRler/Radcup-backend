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
    address: 'Some place',
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
        expect(res.body.address).to.eql(game.address)
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

  it('should post a game and update it', function(done) {
    var newAddress = 'a other place';
    var gameId;
    var newGame={
      address: 'Some place 2',
      lat: '433222224',
      lng: '532426773'
    };
    //First post a game, then update this game
    request(server.app)
      .post('/api/games')
      .auth(user.email, user.password)
      .send( newGame )
      .end(function(err, res){
        expect(err).to.eql(null);
        expect(res.status).to.eql(200);
        expect(res.body.address).to.eql(newGame.address)
        gameId=res.body._id;
        request(server.app)
          .put('/api/games/'+gameId)
          .auth(user.email, user.password)
          .send( {address: newAddress, lat:'44444', lng: '42222'})
          .end(function(err, res){
            expect(err).to.eql(null);
            expect(res.status).to.eql(200);
            expect(res.body.address).to.eql(newAddress);
            expect(res.body.lat).to.eql('44444');
            expect(res.body.lng).to.eql('42222');
            done();
          });
      });


  });

  it('should delete a game', function(done) {
    var newGame2={
      address: 'Some place 3',
      lat: '1337',
      lng: '2323'
    };
    //First post a game to get the game_id which we want to delete!
    request(server.app)
      .post('/api/games')
      .auth(user.email, user.password)
      .send( newGame2 )
      .end(function(err, res){
        expect(err).to.eql(null);
        expect(res.status).to.eql(200);
        expect(res.body.address).to.eql(newGame2.address)
        gameId=res.body._id;
        request(server.app)
          .delete('/api/games/' + gameId)
          .auth(user.email, user.password)
          .end(function(error, response){
            expect(error).to.eql(null);
            expect(response.status).to.eql(200);
            expect(response.body.message).to.eql('Deleted game ' + gameId);
            done();
          });
      });
  });
});
