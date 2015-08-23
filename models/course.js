var mongoose = require('mongoose');

var CourseSchema = mongoose.model('Course', new mongoose.Schema({
	title: {type: String},
	description : {type: String},
	cover: {type:  mongoose.Schema.ObjectId, ref:'Media', default:null},
	banner: {type:  mongoose.Schema.ObjectId, ref:'Media', default: null},
	durations : [{type : mongoose.Schema.ObjectId, ref:'Duration'}],
	lastModify : {type : Date},
	isActive : {type : Boolean, default : true }
}));

var Course = mongoose.model('Course', CourseSchema);

module.exports =Course;