var mongoose = require('mongoose');

var MediaSchema = mongoose.model('Media', new mongoose.Schema({
	title: {type: String, required: true, default: 'Untitled' },
	size: {type: Number, required: true },
	path: {type: String, required: true },
	type: {type:String, required: true, default: 'Image'},
	target: { type: String, required: true, default: 'Gallery' },
	createDate : {type : Date, default : Date.now },
	archive : {type : Boolean, default : false }
}));

var Media = mongoose.model('Media', MediaSchema);
module.exports =Media;