var mongoose =require('mongoose');
var GameSchema = new mongoose.Schema({
  // host: { type: String, require: true },
  desc: { type: String, default: "Let's rad that cup, dayum!", require: true },
  lat: { type: Number },
  lng: { type: Number },
  players: {
    one: { type: String },
    two: { type: String, default: 'freeSlot' },
    three: { type: String, default: 'freeSlot' },
    four: { type: String, default: 'freeSlot' }
  }
});
module.exports = mongoose.model('Game', GameSchema);

//TODO: validate and trim
 //city: String,
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
