var mongoose = require('mongoose');

var CourseSchema = new mongoose.Schema({
	title: {type: String},
	tag: {type: String, default: ''},
	category: {type: String},
	subCategory: {type: String},
	order: {type: Number, default: 0 },
	startLevel: {type: Number, default: 1},
	endLevel: {type: Number, default: 10},
	description : {type: String},
	content : {type: String, default: ''},
	cover: {type:  mongoose.Schema.ObjectId, ref:'Media', default:null},
	banner: {type:  mongoose.Schema.ObjectId, ref:'Media', default: null},
	durations : [{type : mongoose.Schema.ObjectId, ref:'Duration'}],
	links : [{type : mongoose.Schema.ObjectId, ref:'CourseLink'}],
	type: {type: String, default: 'Weekly'},
	startPoint : {type : Date},
	lastModify : {type : Date},
	isActive : {type : Boolean, default : true }
});

var Course = mongoose.model('Course', CourseSchema);

module.exports =Course;