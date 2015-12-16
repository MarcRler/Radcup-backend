var expect = require('expect.js');
var request = require('supertest');
var server = require('../server');
var should = require('should');
var setup = require('./setup');
var userHelper = require('./helpers/userHelper');

describe('Users', function() {
  var user = {
    username: 'MaxMustermann',
    email: 'max@mustermann.de',
    password: 'pwd123'
  };
  before(function(ready){
    setup.setupDatabase(function(){
      server.start(function(){
        userHelper.createUser(user.username, user.email, user.pwd, function(){
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

  it.only('should create a user', function(done) {
    var user = {
      username: 'HansHansensen',
      email: 'hans@hansensen.de',
      password: 'pwd123'
    };
    request(server.app)
      .post('/api/users')
      .send(user)
      .end(function(err, res){
        console.log(err, res);
        expect(err).to.eql(null);
        expect(res.status).to.eql(200);
        expect(res.body.message).to.eql('Created user ' + user.username);
        done();
      });
  });

  it('should get a user', function(done) {
    request(server.app)
      .get('/api/users/' + user.email)
      .auth(user.email, user.pwd)
      .end(function(err, res){
        expect(err).to.eql(null);
        expect(res.status).to.eql(200);
        expect(res.body.username).to.eql(user.username);
        done();
      });
  });

  // it('should change credentials of a user', function(done) {
  //   var newUsername = 'MarkusMustermann';
  //   request(server.app)
  //     .get('/api/users/' + user.email)
  //     .auth(user.email, user.pwd)
  //     .end(function(err, res){
  //       request(server.app)
  //         .put('api/users/' + res.body._id)
  //         .auth(user.email, user.pwd)
  //         .send( { username: newUsername } )
  //         .end(function(error, response){
  //           expect(error).to.eql(null);
  //           expect(response.status).to.eql(200);
  //           expect(response.body.username).to.eql(newUsername);
  //           done();
  //         });
  //     });
  // });

  // it('should delete a user', function(done) {
  //   request(server.app)
  //     .get('/api/users/' + user.email)
  //     .auth(user.email, user.pwd)
  //     .end(function(err, res){
  //       reqeust(server.app)
  //         .delete('api/users/' + res.body._id)
  //         .end(function(error, response){
  //           expect(err).to.eql(null);
  //           expect(res.status).to.eql(200);
  //           expect(res.body.message).to.eql('Deleted user' + user.username);
  //           done();
  //         });
  //     });
  // });
});
