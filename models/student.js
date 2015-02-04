var mongoose = require('mongoose');


var StudentSchema = mongoose.model('Student', new mongoose.Schema({
	student_id: {type: String, required: true },
	agent_id: {type: String, required: true },
	firstname: {type: String, required: true },
	lastname: {type: String, required: true },
	commissionRate: {type: String, required: true },
	pomotionRate: {type: String, required: true },
	note: {type: String},
	registerDate: {type: Date,default: Date.now },
	isQuit : {type : Boolean, default : false },
}));


var Student = mongoose.model('Student', StudentSchema);

module.exports =Student;