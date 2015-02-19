var mongoose = require('mongoose');

var SlideNodeSchema = mongoose.model('SlideNode', new mongoose.Schema({
	title: {type: String, required: true },
	title: {type: String, required: true },
	position-v:{type: String, required: true },
	position-h:{type: String, required: true },
	createDate : {type : Date, default : Date.now },
	isActive : {type : Boolean, default : false }
}));

var Blog = mongoose.model('SlideNode', SlideNodeSchema);

module.exports =SlideNode;