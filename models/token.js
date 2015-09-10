var mongoose = require('mongoose');
//var Schema = mongoose.Schema;

var TokenSchema = mongoose.model('Token', new mongoose.Schema({
	type: {type: String, required: true, default: 'staff'},
	user : {type: String, required: true },
	isActived : {type: Boolean, required: true, default:false },
	created : {type : Date, default : Date.now },
}));
var Token = mongoose.model('Token', TokenSchema);
module.exports =Token;