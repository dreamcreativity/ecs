var mongoose = require('mongoose');

var ActivitySchema = mongoose.model('Activity', new mongoose.Schema({
	title : {type : String},
	description : {type: String},
	mediaIds : [String],
	isActive : {type : Boolean, default : true }
}));

var Activity = mongoose.model('Activity', ActivitySchema);

module.exports =Activity;