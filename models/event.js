var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var EventSchema = mongoose.model('Event', new mongoose.Schema({
	title : {type : String, required: true},
	date : {type : Date, default : Date.now },
	description : {type: String},
	mediaIds : [String],
	isActive : {type : Boolean, default : true }
}));

var Event = mongoose.model('Event', EventSchema);

module.exports =Event;