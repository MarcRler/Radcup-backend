var mongoose = require('mongoose');
var config = require('../config');

exports.setupDatabase = function() {
  mongoose.connect(config, function(){
    console.log('Connected to ' + config);
  });
};

exports.teardownDatabase = function() {
  mongoose.connect(config, function() {
    mongoose.connection.db.dropDatabase(function (err) {
      mongoose.connection.close();
    });
  });
};
