var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var EventSchema = new mongoose.Schema({
	title : {type : String, required: true},
	date : {type : Date, default : Date.now },
	description : {type: String},
	location: {type: String, default: ''},
	cover: { type: Schema.Types.ObjectId, ref: 'Media', default: null },
	isActive : {type : Boolean, default : true }
});

var Event = mongoose.model('Event', EventSchema);

module.exports =Event;