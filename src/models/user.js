
var mongoose = require('mongoose');

module.exports = mongoose.model('User',{
	id: String,
	username: String,
	password: String,
	email: String,
	firstName: String,
	lastName: String,
	radiusForGames: Buffer,
	perimeter: Number,
	activated: Boolean
});
