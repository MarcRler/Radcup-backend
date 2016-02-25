var expect = require('expect.js');
var request = require('supertest');
var server = require('../server');
var should = require('should');
var setup = require('./setup');
var userHelper = require('./helpers/userHelper');
var id;
/* User Testsuite */
describe('User API Testsuite:', function() {
  var user = {
    username: 'HaxMustermann',
    email: 'hax@mustermann.de',
    password: 'password123'
  };
  before(function(ready){
    setup.setupDatabase(function(){
      server.start(function(){
        userHelper.createUser(user.username, user.email, user.password, function(){
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

  it('should create a user', function(done) {
    var user = {
      username: 'HansHansensen',
      email: 'hans@hansensen.de',
      password: 'password123'
    };
    request(server.app)
      .post('/api/users')
      .send(user)
      .end(function(err, res){
        expect(err).to.eql(null);
        expect(res.status).to.eql(200);
        expect(res.body.message).to.eql('Created user ' + user.username);
        done();
      });
  });

  it('should get a user', function(done) {
    request(server.app)
      .get('/api/users/' + user.email)
      .auth(user.email, user.password)
      .end(function(err, res){
        expect(err).to.eql(null);
        expect(res.status).to.eql(200);
        expect(res.body.username).to.eql(user.username);

        done();
      });
  });

  it('should change credentials of a user', function(done) {
    var newEmail = 'markus@hatkeineemail.de';

    request(server.app)
      .get('/api/users/' + user.email)
      .auth(user.email, user.password)
      .end(function(err, res){
        expect(err).to.eql(null);
        expect(res.status).to.eql(200);
        id = res.body._id;
        request(server.app)
            .put('/api/users/' + id)
            .auth(user.email, user.password)
            .send( { username: user.username , email: newEmail , password: user.password} )
            .end(function(error, response){
              expect(error).to.eql(null);
              expect(response.status).to.eql(200);
              expect(response.body.email).to.eql(newEmail);
              done();
            });
      });

  });

  it('should delete a user', function(done) {
    var user2 = {
      username: 'delteThisUser',
      email: 'del@rm.de',
      password: 'password123'
    };
    request(server.app)
        .post('/api/users')
        .send(user2)
        .end(function(err, res){
          request(server.app)
              .get('/api/users/'+user2.email)
              .auth(user2.email, user2.password)
              .end(function(err, res1){
                request(server.app)
                .delete('/api/users/' + res1.body._id)
                .auth(user2.email, user2.password)
                .end(function(error, response){
                  expect(error).to.eql(null);
                  expect(response.status).to.eql(200);
                  expect(response.body.message).to.eql('Deleted user ' + res1.body._id);
                  done();
            });
          });
      });
  });
});
