var mongoose = require('mongoose');


var AgentSchema = mongoose.model('Agent', new mongoose.Schema({
	firstname: {type: String, required: true },
	lastname: {type: String, required: true },
	email: {type: String, required: true },
	workphone: {type: String, required: true },
	cellphone: {type: String, required: true },
	region : {type: String, required:true },
	isDelete : {type : Boolean, default : false },
	createDate : {type : Date, default : Date.now },
}));


var Agent = mongoose.model('Agent', AgentSchema);

module.exports =Agent;