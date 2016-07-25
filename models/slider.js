var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var SliderSchema = new mongoose.Schema({
	heading: {type: String, required: true },
	sub_heading: {type: String, required: false },
	color: {type:String, required: true, default: '#bbb'},
	direction: { type: String, required: true, default: 'bottom' },
	resource: { type: Schema.Types.ObjectId, ref: 'Media', default: null },
	position:{type: String, required: true },
	order:{type: Number, required: true, default: 0},
	createDate : {type : Date, default : Date.now },
	is_active : {type : Boolean, default : false }
});

var Slider = mongoose.model('Slider', SliderSchema);

module.exports =Slider;