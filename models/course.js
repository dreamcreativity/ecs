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
	youtube: {type: String, default: ''},
	startPoint : {type : Date},
	lastModify : {type : Date},
	isShowInCalendar : {type : Boolean, default : false },
	calendarColor : {type: String, default: '#eeeeee'},
	calendarFontColor : {type: String, default: '#000000'},
	isActive : {type : Boolean, default : true }
});

var Course = mongoose.model('Course', CourseSchema);

module.exports =Course;