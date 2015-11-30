var mongoose = require('mongoose');


var TestQuestionAnswerSchema = new mongoose.Schema({
	title : {type: String},
	created : {type : Date, default: Date.now },
	type: {type: String},
	isCorrect: {type: Boolean, default: false},
	correctAnswer: {type: String, default: ''},
	TestQuestion : {type: mongoose.Schema.ObjectId, ref: 'TestQuestion'}
});

var TestQuestionAnswer = mongoose.model('TestQuestionAnswer', TestQuestionAnswerSchema);

module.exports = TestQuestionAnswer;