var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
//validieren der Email mit einem regulären Ausdruck
var validateEmail = function(email) {
  var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return re.test(email)
};
// neus Benutzer Schema anlegen mit validen Benutzer Daten
var UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
	email: {
		type: String,
		trim: true,
    unique: true,
    required: true,
    validate: [validateEmail, 'Please fill a valid email address'],
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
	},
  password: {
    type: String,
    required: true
  }
});
//Methode zum verfizieren eines Benutzer-Passwords
UserSchema.methods.verifyPassword = function(password, cb) {
  bcrypt.compare(password, this.password, function(err, isMatch) {
    if (err) return cb(err);
    cb(null, isMatch);
  });
};

UserSchema.pre('save', function(callback) {
  var user = this;

  if (!user.isModified('password')) return callback();

  bcrypt.genSalt(5, function(err, salt) {
    if (err) return callback(err);
  //Password muss gehashd werden, damit es nicht in Klartext in der DB liegt
    bcrypt.hash(user.password, salt, null, function(err, hash) {
      if (err) return callback(err);
      user.password = hash;
      callback();
    });
  });
});

module.exports = mongoose.model('User', UserSchema);
