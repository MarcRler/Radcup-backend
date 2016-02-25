var mongoose =require('mongoose');
/* Anlegen eines neuen Game Schemas, alle Daten welche in einem Spiel vorhanden
sein müssen.
*/
var GameSchema = new mongoose.Schema({
  desc: { type: String, default: "Let's rad that cup, dayum!", require: true },
  lat: { type: Number },
  lng: { type: Number },
  players: {
    one: { type: String },
    two: { type: String, default: 'freeSlot' },
    three: { type: String, default: 'freeSlot' },
    four: { type: String, default: 'freeSlot' }
  },
  state: { type: String },
  time : { type: Date},
  results: {
    startTime: {type: Date, default: null},
    endTime: {type: Date, default: null},
    winner: {type: String, default: 'No Winner'},
    loserCupsLeft: {type : Number, default : '6'}
  }
});
module.exports = mongoose.model('Game', GameSchema);
