//authenticate Controller wird genutzt um Passport zu verwenden (Login Funktionalität)
var passport = require('passport');
var BasicStrategy = require('passport-http').BasicStrategy;
var User = require('../models/user');
/*wir nutzen nur die BasicStrategy - keine verschlüsselung des Benutzernamens &
Passwords. Sollte man das Backend produktiv nutzen wollen muss zwigend auf HTTPS
Kommunikation umgestellt werden - siehe auch server.js
*/
passport.use(new BasicStrategy(
  function(email, password, callback) {
    User.findOne({ email: email }, function (err, user) {
      if (err) { return callback(err); }

      if (!user) { return callback(null, false); }

      user.verifyPassword(password, function(err, isMatch) {
        if (err) { return callback(err); }

        if (!isMatch) { return callback(null, false); }

        return callback(null, user);
      });
    });
  }
));
//exportieren der authentication session
exports.isAuthenticated = passport.authenticate('basic', { session : false });
