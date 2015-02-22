var mongoose = require('mongoose');

var SliderSchema = mongoose.model('Slider', new mongoose.Schema({
	title: {type: String, required: true },
	sub_title: {type: String, required: true },
	color: {type:String, required: true, default: '#bbb'},
	position_v:{type: String, required: true },
	position_h:{type: String, required: true },
	createDate : {type : Date, default : Date.now },
	isActive : {type : Boolean, default : false }
}));

var Slider = mongoose.model('Slider', SliderSchema);

module.exports =Slider;