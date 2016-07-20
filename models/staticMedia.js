var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var StaticMediaSchema = new mongoose.Schema({
	media: { type: Schema.Types.ObjectId, ref: 'Media', default: null },
	created : {type : Date, default : Date.now },
	modified : {type : Date, default : Date.now },
	isActived : {type : Boolean, default : false },
	type: {type: String},
	typeIndex: {type: Number}
});

var StaticMedia = mongoose.model('StaticMedia', StaticMediaSchema);

module.exports = StaticMedia;	




			