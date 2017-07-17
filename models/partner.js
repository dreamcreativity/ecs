var mongoose = require('mongoose');


var PartnerSchema = new mongoose.Schema({
	name: {type: String, required: true },
	cover: {type:  mongoose.Schema.ObjectId, ref:'Media', default:null},
	report: {type: mongoose.Schema.ObjectId, ref:'Media', default:null},
	description: {type: String, default: ''},
	content: {type: String, default: ''},
	tags : [{type : String}],
	categories : [{type : String}],
	email: {type: String},
	workphone: {type: String},
	cellphone: {type: String},
	isDelete : {type : Boolean, default : false },
	createDate : {type : Date, default : Date.now },
    updateDate : {type : Date, default : Date.now }

});


var Partner = mongoose.model('Partner', PartnerSchema);

module.exports =Partner;