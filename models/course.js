var mongoose = require('mongoose');

var CourseSchema = mongoose.model('Course', new mongoose.Schema({
	title: {type: String},
	description : {type: String},
	coverImgId: {type: String, default:''},
	bannerImgId: {type: String, default:''},
	durations : [{type : mongoose.Schema.ObjectId, ref:'Duration'}],
	lastModify : {type : Date},
	isActive : {type : Boolean, default : true }
}));

// CourseSchema.pre('save', function(next){
//   now = new Date();
//   if ( !this.lastModify ) {
//     this.lastModify = now;
//   }
//   next();
// });



var Course = mongoose.model('Course', CourseSchema);

module.exports =Course;