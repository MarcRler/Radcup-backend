var Game = require('../../models/game');

exports.createGames = function(numberOfGames, done) {
  var created = 0;
  var games = {};
  for(var i = 0; i < numberOfGames; i++) {
    games[i] = new Game({ adress: 'Street_' + i });
  };
  for(var index in games) {
    var game = games[index];
    game.save(function(err) {
      if (err) throw err;
      created++;
    });
    if (created === numberOfGames){
      done();
    };
  };
};
