var mongoose = require('mongoose');


var CourseLinkSchema = new mongoose.Schema({
	title : {type: String},
	href : {type : String},
	order : {type: Number, default: 0},
	course : {type: mongoose.Schema.ObjectId, ref: 'Course'}
});

var CourseLink = mongoose.model('CourseLink', CourseLinkSchema);

module.exports =CourseLink;