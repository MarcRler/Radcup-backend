var Game = require('../models/game');

/*
Creates a new game
*/
exports.postGames = function(req, res) {
  var game = new Game();
  game.desc = req.body.desc
  game.lat = req.body.lat
  game.lng = req.body.lng
  game.time = req.body.time
  game.state = req.body.state;
  game.players.one = req.user.username
  game.players.two = req.body.two
  game.players.three = req.body.three
  game.players.four = req.body.four

  game.save(function(err, erg) {
    if (err) {
      res.format({
        'application/json': function() {
          res.send({
            error: err
          });
          res.send(404, err);
        }
      });
    } else {
      res.format({
        'application/json': function() {
          res.send(200, erg);
        }
      });
    }
  });
};

/*
Returns all games
*/
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

exports.getStatisticsForPlayer = function(req, res) {

  var username = req.user.username;

  findGamesForUsername(function(dataObject){

    if (dataObject.err)
      res.send(dataObject.err);

      var statistic = {
        won:0,
        lost:0,
        draw:0,
        cupsLeft:0
      }
     var playedGames = 0;
     for(game in dataObject.games){

          if(game.status=="finished"){
            playedGames +=1;
            checkWinner(statistic,game,username);
          }
      }
      res.json(statistic);

  },username);
};

 this.checkWinner = function(statistic,game,username){

   switch (game.results.winner) {
     case "Red": if(game.players.one==username||game.players.two==username){
                  statistics.won +=1;
                  }
                  else{
                    statistics.lost +=1;
                  }
                  break;
     case "Green": if(game.players.three==username||game.players.four==username){
                  statistics.won +=1;
                  }
                  else{
                    statistics.lost +=1;
                  }
                  break;
    case "Draw": statistics.draw +=1;
                  break;

   }
 }

/*
Updates a game
*/
exports.putGame = function(req, res) {
  Game.findById(req.params.game_id, function(err, game) {
    if (!err) {
      game.desc = req.body.desc;
      game.players.two = req.body.players.two;
      game.players.three = req.body.players.three;
      game.players.four = req.body.players.four;
      game.state = req.body.state;
      game.results.winner = req.body.results.winner;
      game.results.loserCupsLeft = req.body.results.loserCupsLeft;
      game.results.startTime = req.body.results.startTime;
      game.results.endTime = req.body.results.endTime;

      if (game.players.two != "freeSlot" && game.players.three != "freeSlot" && game.players.four != "freeSlot") {
        if (game.state != "started" && game.state != "finished") {
          game.state = "startable";
        }
      }

      game.save(function(err) {
        if (!err) {
          res.json(game);
        } else {
          console.log(err);
          if (err.name == 'ValidationError') {
            res.statusCode = 400;
            res.send({
              error: 'Validation error'
            });
          } else if (err.name == 'MongoError' && err.code == 11000) {
            res.statusCode = 400;
            res.send({
              error: 'Duplicate validation error'
            });
          } else {
            res.statusCode = 500;
            res.send({
              error: 'Server error'
            });
          }
          console.log('Internal error(%d): %s', res.statusCode, err.message);
        }
      });
    } else {
      console.log(err);
      res.statusCode = 400;
      res.send({
        error: 'User not found in DB'
      });
    }

  });
};

/*
Deletes a game
*/
exports.deleteGame = function(req, res) {
  Game.findByIdAndRemove(req.params.game_id, function(err, game) {
    if (err) {
      res.format({
        'application/json': function() {
          res.send({
            error: err
          });
          res.send(404, err);
        }
      });
    } else {
      res.format({
        'application/json': function() {
          res.json({
            message: 'Deleted game ' + game._id
          });
        }
      });
    }
  });
};

/*
Returns all joinable Games for a specific user
*/
exports.joinableGames = function(req, res) {
  Game.find({
      $nor: [{
        'players.one': req.user.username
      }, {
        'players.two': req.user.username
      }, {
        'players.three': req.user.username
      }, {
        'players.four': req.user.username
      }]
    },
    function(err, games) {
      if (err)
        res.send(err);

      res.json(games);
    });
};

/*
Returns all games a user has taken part in or will take part in
*/
exports.myGames = function(req, res) {

  findGamesForUsername(function(dataObject){

    if (dataObject.err)
      res.send(dataObject.err);

      res.json(dataObject.games);

  },req.user.username);

};


findGamesForUsername = function(callback,username){

  Game.find({
    $or: [{
      'players.one': username
    }, {
      'players.two': username
    }, {
      'players.three': username
    }, {
      'players.four': username
    }]
  }, function(err, games) {


    var dataObject ={
      err:err,
      games:games
    }

    callback(dataObject);
  });
}
