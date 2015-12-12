// TODO: WHAT IS HAPPENING WITH THE CALLBACK

var User = require('../../models/user');

exports.createUser = function(username, email, password) {
  var user = new User({
    username: username,
    email: email,
    password: password
  });
  user.save(function(err) {
    if (err) throw err;
    // done();
  });
};
