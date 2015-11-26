var Game = require('../models/game');

exports.postGames = function(req, res) {
  var game = new Game();

  game.userId = req.user._id;
//  game.username = req.body.username;
  game.adress = req.body.adress;
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
  game.save(function(err) {
    if (err)
      res.send(err);

    res.json({ message: 'Game added', data: game });
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
  Game.find({userId: req.user._id, _id: req.params.game_id }, function(err, game) {
    if (err)
      res.send(err);

    res.json(game);
  });
};

exports.putGame = function(req, res) {
  Game.update({userId: req.user._id, _id: req.params.game_id },
      {adress: req.body.adress
      //TODO: all changable game values
    },
    function(err, adress, raw) {
    if (err)
      res.send(err);

      res.json({messag:adress+ " updated"});

  });
};

exports.deleteGame = function(req, res) {
  Game.remove({userId: req.user._id, _id: req.params.game_id }, function(err) {
   if (err)
     res.send(err);

   res.json({ message: 'Game removed' });
  });
};