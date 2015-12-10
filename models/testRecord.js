var mongoose = require('mongoose');


var TestRecordSchema = new mongoose.Schema({
	firstName : {type: String},
	lastName: {type: String},
	email: {type: String},
	country: {type: String},
	created : {type : Date, default: Date.now },
	answers: [],
	questions: []

});

var TestRecord = mongoose.model('TestRecord', TestRecordSchema);

module.exports = TestRecord;