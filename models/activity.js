var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ActivitySchema = new mongoose.Schema({
	title : {type : String},
	subtitle : {type : String},
	description : {type: String},
	cover:  { type: Schema.Types.ObjectId, ref: 'Media'},
	album:  [{ type: Schema.Types.ObjectId, ref: 'Media'}],
	isActive : {type : Boolean, default : false },
	displayOrder: {type : Number, default : 0 }
});

var Activity = mongoose.model('Activity', ActivitySchema);

module.exports =Activity;