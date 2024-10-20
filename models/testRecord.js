var mongoose = require('mongoose');
var random = require('mongoose-random');

var TestRecordSchema = new mongoose.Schema({
	firstName : {type: String, default: ''},
	lastName: {type: String, default: ''},
	email: {type: String, default: ''},
	country: {type: String, default: ''},
	created : {type : Date, default: Date.now },
	correctCount: {type: Number, default: 0 },
	rate: {type: Number, default: 0 },
	questions: []

});

TestRecordSchema.plugin(random, { path: 'r' }); 

var TestRecord = mongoose.model('TestRecord', TestRecordSchema);

module.exports = TestRecord;