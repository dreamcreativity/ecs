var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ActivitySchema = new mongoose.Schema({
	title : {type : String},
	description : {type: String},
	cover:  { type: Schema.Types.ObjectId, ref: 'Media', default: null },
	isActive : {type : Boolean, default : true }
});

var Activity = mongoose.model('Activity', ActivitySchema);

module.exports =Activity;