var mongoose = require('mongoose');
var random = require('mongoose-random');

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

TestQuestionSchema.plugin(random, { path: 'r' }); 

var TestQuestion = mongoose.model('TestQuestion', TestQuestionSchema);

module.exports = TestQuestion;
