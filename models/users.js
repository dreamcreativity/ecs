var mongoose = require('mongoose');


var UserModel = mongoose.model('User', new mongoose.Schema({
	email: {type: String, required: true },
	password: {type: String, required: true },
	first_name: {type: String, required: true },
	last_name: {type: String, required: true },
	created: Date,
	modified: Date
}));

module.exports = UserModel;