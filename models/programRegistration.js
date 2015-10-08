var mongoose = require('mongoose');

var ProgramRegistrationSchema = new mongoose.Schema({
	course: {type:  mongoose.Schema.ObjectId, ref:'Course', default:null},
	title: {type: String},
	level : {type : String},
	duration : {type: String},
	startDate : {type : Date},
	createDate : {type : Date, default : Date.now }
});

var ProgramRegistrationSchema = mongoose.model('ProgramRegistration', ProgramRegistrationSchema);

module.exports =ProgramRegistrationSchema;