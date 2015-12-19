var Game = require('../models/game');

exports.postGames = function(req, res) {
  var game = new Game();


  game.userId = req.user._id;
  //game.username = req.body.username;
  game.adress = req.body.adress;
  game.lat = req.body.lat;
  game.lng = req.body.lng;
  // game.city = req.body.city;
  // game.postalCode = req.body.postalCode;
  // game.latitude = req.body.latitude
  // game.longitude = req.body.longitude;
  // game.meetingPoint = req.body.meetingPoint;
  // game.date = req.body.date;
  // game.players = req.body.players;
  // game.description = req.body.description
  // game.players: {
  //   game.teamRed: {
  //     game.id = req.body.id
  //   },
  //   game.teamBlue: {
  //     game.id = req.body.id
  //   }
  // },
  // game.results: {
  //   game.startTime = req.body.startTime;
  //   game.endTime = req.body.endTime
  //   game.winner = req.body.winner;
  //   game.loserCupsLeft = req.body.loserCupsLeft;
  // }
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
  Game.findById(req.params.game_id, function(err, game) {
    if (!err) {
      game.adress= req.body.adress;
      game.lat=req.body.lat;
      game.lng=req.body.lng;
      game.userId=req.user._id;
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
