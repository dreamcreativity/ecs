var mongoose = require('mongoose');


var TestQuestionSchema = new mongoose.Schema({
	title : {type: String, default: ''},
	subTitle: {type: String, default: ''},
	type: {type: String},
	created : {type : Date, default: Date.now },
	isActived: {type: Boolean, default: true },
	answers: [], 
	correctAnswer: {type: String, default: ''},
	//TestQuestion : [{type: mongoose.Schema.ObjectId, ref: 'TestQuestionAnswer'}]
});

var TestQuestion = mongoose.model('TestQuestion', TestQuestionSchema);

module.exports = TestQuestion;