var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var SliderSchema = mongoose.model('Slider', new mongoose.Schema({
	heading: {type: String, required: true },
	sub_heading: {type: String, required: true },
	color: {type:String, required: true, default: '#bbb'},
	direction: { type: String, required: true, default: 'bottom' },
	resource: { type: Schema.Types.ObjectId, ref: 'Meida', required: true, default: null },
	position:{type: String, required: true },
	createDate : {type : Date, default : Date.now },
	is_active : {type : Boolean, default : false }
}));

var Slider = mongoose.model('Slider', SliderSchema);

module.exports =Slider;