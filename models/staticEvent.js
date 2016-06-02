var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var StaticEventSchema = new mongoose.Schema({
	media: { type: Schema.Types.ObjectId, ref: 'Media', default: null },
	created : {type : Date, default : Date.now },
	modified : {type : Date, default : Date.now },
	isActived : {type : Boolean, default : false }
});

var StaticEvent = mongoose.model('StaticEvent', StaticEventSchema);

module.exports = StaticEvent;	




			