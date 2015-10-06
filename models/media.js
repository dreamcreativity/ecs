var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var MediaSchema = new mongoose.Schema({
	title: {type: String, required: true, default: 'Untitled' },
	size: {type: Number, required: true },
	ext: {type: String, required: true },
	path: {type: String, required: true },
	thumbnail: {type: String, required: true, default: null },
	type: {type:String, required: true, default: 'Image'},
	target: { type: String, required: true, default: 'Gallery' },
	createDate : {type : Date, default : Date.now },
	archive : {type : Boolean, default : false }
});

var Media = mongoose.model('Media', MediaSchema);
module.exports =Media;