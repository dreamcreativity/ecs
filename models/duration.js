var mongoose = require('mongoose');


var DurationSchema = mongoose.model('Duration', new mongoose.Schema({
	title : {type: String},
	price : {type : Number},
	week: {type: Number, default: 1},
	order : {type: Number, default: 0},
	course : {type: mongoose.Schema.ObjectId, ref: 'Course'}
}));

var Duration = mongoose.model('Duration', DurationSchema);

module.exports =Duration;