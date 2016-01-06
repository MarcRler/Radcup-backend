var Game = require('../models/game');

exports.postGames = function(req, res) {
  var game = new Game();
  game.desc = req.body.desc
  game.lat = req.body.lat
  game.lng = req.body.lng
  game.players.one = req.user.username
  game.players.two = req.body.two
  game.players.three = req.body.three
  game.players.four = req.body.four

  game.save(function(err,erg) {
    if (err) {
    res.format({
      'application/json': function(){
        res.send({ error: err });
        res.send(404,err);
      }});
    } else {
      res.format({
        'application/json': function(){
          res.send(200,erg);
        }});
      }
    });
};

exports.getGames = function(req, res) {
  Game.find(function(err, games) {
    if (err)
      res.send(err);

    res.json(games);
  });
};

exports.getGame = function(req, res) {
  Game.findById(req.params.game_id, function(err, game) {
    if (err)
      res.send(err);

    res.json(game);
  });
};

exports.putGame = function(req, res) {
  console.log(req.body);
  Game.findById(req.params.game_id, function(err, game) {
    if (!err) {
      game.desc= req.body.desc;
      game.players.two = req.body.players.two;
      game.players.three = req.body.players.three;
      game.players.four = req.body.players.four;
      game.save(function(err) {
        if(!err) {
          res.json(game);
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

exports.deleteGame = function(req, res) {
  Game.findByIdAndRemove(req.params.game_id, function(err, game) {
    if (err) {
    res.format({
      'application/json': function(){
        res.send({ error: err });
        res.send(404,err);
      }});
    } else {
      res.format({
        'application/json': function(){
          res.json( { message: 'Deleted game ' + game._id } );
        }});
    }
  });
};

exports.joinableGames = function(req, res) {
  Game.find({ 'players.one': { $nin: req.user.username } }, function(err, games) {
    if (err)
      res.send(err);

    res.json(games);
  });
};

exports.myGames = function(req, res) {
  Game.find({ 'players.one': req.user.username }, function(err, games) {
    if (err)
      res.send(err);

    res.json(games);
  });
};
