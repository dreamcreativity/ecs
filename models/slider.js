var mongoose = require('mongoose');

var SliderSchema = mongoose.model('Slider', new mongoose.Schema({
	heading: {type: String, required: true },
	sub_heading: {type: String, required: true },
	color: {type:String, required: true, default: '#bbb'},
	direction: { type: String, required: true, default: 'bottom' },
	position_v:{type: Number, required: true },
	position_h:{type: Number, required: true },
	createDate : {type : Date, default : Date.now },
	isActive : {type : Boolean, default : false }
}));

var Slider = mongoose.model('Slider', SliderSchema);

module.exports =Slider;