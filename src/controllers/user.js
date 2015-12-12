var User = require('../models/user');

exports.postUsers = function(req, res) {
  var user = new User({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password
  });

  user.save(function(err, erg) {
    if (err) {
    res.format({
      'application/json': function(){
        res.send({ error: err });
        res.send(404,err);
      }});
    } else {
      res.format({
        'application/json': function(){
          res.json({ message: 'Created user ' + req.body.username });
        }});
    };
  });
};

exports.getUser = function(req, res) {
  User.findOne({ email: req.params.email }, function(err, user) {
    if (err)
      res.send(err);

    res.json(user);
  });
};

exports.deleteUser = function(req, res) {
  User.findByIdAndRemove(req.params.user_id, function(err, user) {
    if (err) {
    res.format({
      'application/json': function(){
        res.send({ error: err });
        res.send(404,err);
      }});
    } else {
      res.format({
        'application/json': function(){
          res.json( { message: 'Deleted user ' + user.username } );
        }});
    }
  });
};

exports.putUser = function(req, res) {
  User.findById(req.params.user_id, function(err, user) {
    if (err)
      res.send(err);

    user.username = req.body.username;
    user.email = req.body.email;
    user.password = req.body.password;

    user.save(function(err) {
      if (err)
        res.send(err);

      res.json(user);
    });
  });
};
