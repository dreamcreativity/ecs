var mongoose = require('mongoose');


var DurationSchema = new mongoose.Schema({
	title : {type: String},
	price : {type : Number},
	week: {type: Number, default: 1},
	level: {type: String},
	order : {type: Number, default: 0},
	course : {type: mongoose.Schema.ObjectId, ref: 'Course'},
	pricePartTime: {type: Number, default : 0 },
	priceStandard: {type: Number, default : 0 },
	priceIntensive: {type: Number, default : 0 }

});
  
var Duration = mongoose.model('Duration', DurationSchema);

module.exports =Duration;