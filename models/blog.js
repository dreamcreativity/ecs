var mongoose = require('mongoose');

var BlogSchema = mongoose.model('Blog', new mongoose.Schema({
	title: {type: String, required: true },
	sender : {type: String, required: true },
	content : {type: String, required: true },
	createDate : {type : Date, default : Date.now },
	isDelete : {type : Boolean, default : false }
}));

var Blog = mongoose.model('Blog', BlogSchema);

module.exports =Blog;