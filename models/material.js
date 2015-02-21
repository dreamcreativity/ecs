var mongoose = require('mongoose');

var MaterialSchema = mongoose.model('Material', new mongoose.Schema({
	name: {type: String, required: true },
	content : {type: String, required: true },
	path : {type: String, required: true },
	region : {type: String, required: true },
	createDate : {type : Date, default : Date.now },
	updateDate : {type : Date, default : Date.now },
	isDelete : {type : Boolean, default : false },

}));

var Material = mongoose.model('Material', MaterialSchema);

module.exports =Material;