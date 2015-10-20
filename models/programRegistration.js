var mongoose = require('mongoose');

var ProgramRegistrationSchema = new mongoose.Schema({
	course: {type:  mongoose.Schema.ObjectId, ref:'Course', default:null},
	title: {type: String},
	level : {type : String},
	duration : {type: String},
	price : {type : Number},
	commissionRate : {type: Number, default : 0},
	promotionRate : {type : Number, default : 0},
	startDate : {type : Date},
	createDate : {type : Date, default : Date.now }
});

var ProgramRegistrationSchema = mongoose.model('ProgramRegistration', ProgramRegistrationSchema);

module.exports =ProgramRegistrationSchema;