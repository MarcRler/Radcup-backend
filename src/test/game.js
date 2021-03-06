var expect = require('expect.js');
var request = require('supertest');
var server = require('../server');
var should = require('should');
var setup = require('./setup');
var gameHelper = require('./helpers/gameHelper');
var userHelper = require('./helpers/userHelper');
/* Game Testsuite */
describe('Games API Testsuite.', function() {
  var user = {
    username: 'MarkusMustermann',
    email: 'markus@mustermann.de',
    password: '1234'
  };
  var game = {
    desc: 'Some place',
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
        expect(res.body.desc).to.eql(game.desc);
        expect(res.body.results.winner).to.eql('No Winner');
        expect(res.body.results.endTime).to.eql(null);
        expect(res.body.players.one).to.eql(user.username);
        done();
      });
  });

  it('should get all games', function(done) {
    request(server.app)
      .get('/api/games')
      .end(function(err, res){
        expect(err).to.eql(null);
        expect(res.status).to.eql(200);
        expect(res.body.length).to.be.above(4);
        done();
      });
  });

  it('should post a game and update it', function(done) {
    var newdesc = 'a other place';
    var gameId;
    var newGame={
      desc: 'Some place 2',
      lat: '433222224',
      lng: '532426773',
      players:{
        one: user.username,
        two: 'freeSlot',
        three: 'freeSlot',
        four: 'freeSlot'
      },results: {
        winner:"",
        loserCupsLeft: 6,
        startTime:"",
        endTime:""

      }

    };
    //First post a game, then update this game
    request(server.app)
      .post('/api/games')
      .auth(user.email, user.password)
      .send( newGame )
      .end(function(err, res){
        expect(err).to.eql(null);
        expect(res.status).to.eql(200);
        expect(res.body.desc).to.eql(newGame.desc)
        gameId=res.body._id;
        newGame.desc='newVal';
        newGame.results.winner='siegertyp';
        request(server.app)
          .put('/api/games/'+gameId)
          .auth(user.email, user.password)
          .send( newGame)
          .end(function(err, res){
            expect(err).to.eql(null);
            expect(res.status).to.eql(200);
            expect(res.body.desc).to.eql(newGame.desc);
            expect(res.body.results.winner).to.eql('siegertyp');
            done();
          });
      });


  });

  it('should delete a game', function(done) {
    var newGame2={
      desc: 'Some place 3',
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
        expect(res.body.desc).to.eql(newGame2.desc)
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
//evtl. noch joinableGames testen
