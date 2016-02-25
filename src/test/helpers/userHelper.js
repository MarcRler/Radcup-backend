var User = require('../../models/user');
/* Anlegen von Testusern für die Testsuite, durch das model.
*/
exports.createUser = function(username, email, password, saved) {
  var user = new User({
    username: username,
    email: email,
    password: password
  });
  user.save(function(err) {
    if (err) throw err;
    saved();
  });
};
