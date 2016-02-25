var mongoose = require('mongoose');
var config = require('../config');
/*Setup Database for Testsuite*/
exports.setupDatabase = function(ready) {
  mongoose.connect(config, function(){
    console.log('Connected to ' + config);
    ready();
  });
};

exports.teardownDatabase = function(closed) {
  mongoose.connect(config, function() {
    mongoose.connection.db.dropDatabase(function (err) {
      mongoose.connection.close();
      closed();
    });
  });
};
