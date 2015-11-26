var express = require('express');
var app = express();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var passport = require('passport');
var expressSession = require('express-session');
var dbConfig = require('./db');
var development = mongoose.connect(dbConfig.development);

var gameController = require('./controllers/game');

var port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({
  extended: true
}));

var router = express.Router();

router.get('/', function(req, res) {
  res.json({ message: 'this will be a beerpong app' });
});

router.route('/games')
  .post(gameController.postGames)
  .get(gameController.getGames)

router.route('/games/:game_id')
  .get(gameController.postGames)
  .put(gameController.putGame)

app.use('/api', router);

app.listen(3000);
