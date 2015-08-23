var mongoose = require('mongoose');

var CourseSchema = mongoose.model('Course', new mongoose.Schema({
	title: {type: String},
	description : {type: String},
	price : {type : Number},
	scheduleId : {type : String},
	lastModify : {type : Date},
	isActive : {type : Boolean, default : true }
}));

var Course = mongoose.model('Course', CourseSchema);

module.exports =Course;