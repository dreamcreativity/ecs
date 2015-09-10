var mongoose = require('mongoose');

var EmailSchema = mongoose.model('Email', new mongoose.Schema({
	from : {type : String},
	to : {type: String},
	subject : {type: String},
	text : {type: String}
}));

var Email = mongoose.model('Email', EmailSchema);

module.exports =Email;