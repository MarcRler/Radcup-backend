var User = require('../models/user');

//This export handle HTTP POST and will create a new MongoDB entry with User params.
exports.postUsers = function(req, res) {
  var user = new User({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password
  });
  user.save(function(err, erg) {
      if(!err) {
      //  console.log('User created');
        res.format({
          'application/json': function(){
            res.json({ message: 'Created user ' + req.body.username });
           }});
      } else {
          console.log(err);
          if(err.name == 'ValidationError') {
              res.statusCode = 400;
              res.send({ error: 'Validation error' });
          } else if (err.name == 'MongoError' && err.code == 11000) {
              res.statusCode = 400;
              res.send({ error: 'Duplicate validation error' });
          } else {
              res.statusCode = 500;
              res.send({ error: 'Server error' });
          }
          console.log('Internal error(%d): %s',res.statusCode,err.message);
      }
    });
  };

//This export handle HTTP GET and search a USER trough his Email in the Mongo DB
exports.getUser = function(req, res) {
  User.findOne({ email: req.params.email }, function(err, user) {
    if (err)
      res.send(err);

    res.json(user);
  });
};

//This export handle HTTP DELETE and delete a USER trough his user_id in the Mongo DB
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
          res.json( { message: 'Deleted user ' + user._id } );
        }});
    }
  });
};

//This export handle HTTP PUT and update a USER trough the given params in the Mongo DB
exports.putUser = function(req, res) {
  User.findById(req.params.user_id, function(err, user) {
    if(!err) {
    //  console.log('User: '+user._id+' found! Setting update params...');
      user.username = req.body.username;
      user.email = req.body.email;
      user.password = req.body.password;
    //  console.log('updated user: '+user);
      //calling save function to update the specific user!
      user.save(function(err) {
        if (!err) {
          res.json(user);
        } else {
            console.log(err);
            if(err.name == 'ValidationError') {
                res.statusCode = 400;
                res.send({ error: 'Validation error' });
            } else if (err.name == 'MongoError' && err.code == 11000) {
                res.statusCode = 400;
                res.send({ error: 'Duplicate validation error' });
            } else {
                res.statusCode = 500;
                res.send({ error: 'Server error' });
            }
            console.log('Internal error(%d): %s',res.statusCode,err.message);
        }
      });
    } else {
      console.log(err);
      res.statusCode=400;
      res.send({ error: 'User not found in DB'});
    }
  });
};
