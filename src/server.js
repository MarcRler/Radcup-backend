var express = require('express');
var app = express();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var passport = require('passport');
var expressSession = require('express-session');
var config = require('./config');
mongoose.connect(config);
var enableDestroy = require('server-destroy');
/*
 Use this for HTTPS (not recommended if you want use the testsuite)!!!!
var fs = require('fs');
var https = require('https');
var key = fs.readFileSync('./key.pem');
var cert = fs.readFileSync('./cert.pem')
var https_options = {
    key: key,
    cert: cert
};
*/
var gameController = require('./controllers/game');
var userController = require('./controllers/user');
var authController = require('./controllers/auth');

var port = process.env.PORT || 3000;

//CORS -> for Ionic development
app.use(function(req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, GET, PUT,DELETE");
  res.setHeader("Access-Control-Max-Age", "3600");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
  next();
});

app.use(bodyParser.json());

var router = express.Router();

router.get('/', function(req, res,next) {
  res.json({ message: 'this will be a beerpong app' });
});

app.use('/api', router);

router.route('/games')
  .post(authController.isAuthenticated, gameController.postGames)
  .get(gameController.getGames)

router.route('/games/:game_id')
  .get(gameController.getGame)//Macht kein sinn spiele byID nur als Auth User raus zu geben!
  .put(authController.isAuthenticated, gameController.putGame)
  .delete(authController.isAuthenticated, gameController.deleteGame)

router.route('/joinableGames')
  .get(authController.isAuthenticated, gameController.joinableGames)

router.route('/mygames')
    .get(authController.isAuthenticated, gameController.myGames);

router.route('/users')
  .post(userController.postUsers);

router.route('/users/:email')
  .get(authController.isAuthenticated, userController.getUser);

router.route('/users/:user_id')
  .put(authController.isAuthenticated, userController.putUser)
  .delete(authController.isAuthenticated, userController.deleteUser);

module.exports.start = function(started) {
// ONLY USE 4 HTTPS!!!   module.exports.app = https.createServer(https_options, app).listen(port, function () {
module.exports.app = app.listen(port, function () {
    console.log('Listening at port %s', port);
    enableDestroy(module.exports.app);
    if (started) started();
  });
};

module.exports.stop = function(stopped) {
  module.exports.app.destroy(stopped);
};
