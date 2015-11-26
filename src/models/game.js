var mongoose = require('mongoose');

module.exports = mongoose.model('Games',{
	id: String,
	host: String,
	adress: String,
	city: String,
	postalCode: Number,
	latitude: String,
  longitude: String,
  meetingPoint: String,
  date: Date,
  maxPlayer: Number,
  description: String,
  players: {
    teamRed: {
      id: String
    },
    teamBlue: {
      id: String
    }
  },
  results: {
    startTime: Number,
    endTime: Number,
    winner: String,
    loserCupsLeft: Number,
    onFire: {
      id:String
    }
  }
});
