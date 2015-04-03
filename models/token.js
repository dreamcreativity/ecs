var mongoose = require('mongoose');
//var Schema = mongoose.Schema;

var Token = mongoose.model('Token', new mongoose.Schema({
	type: {type: String, required: true, default: 'staff'},
	user : {type: String, required: true },
	modified : {type : Date, default : Date.now },
}));
var Token = mongoose.model('Token', MaterialSchema);
module.exports =Token;