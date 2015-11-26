var mongoose = require('mongoose');

var GameSchema = new mongoose.Schema({
  userId: String,
  adress: String,
  // city: String,
  // postalCode: Number,
  // latitude: String,
  // longitude: String,
  // meetingPoint: String,
  // date: Date,
  // maxPlayer: Number,
  // description: String,
  // players: {
  //   teamRed: {
  //     id: String
  //   },
  //   teamBlue: {
  //     id: String
  //   }
  // },
  // results: {
  //   startTime: Number,
  //   endTime: Number,
  //   winner: String,
  //   loserCupsLeft: Number,
  //   onFire: {
  //     id:String
  //   }
  // }
});

module.exports = mongoose.model('Game', GameSchema);
