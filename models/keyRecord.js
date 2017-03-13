var mongoose = require('mongoose');


var KeyRecordSchema = new mongoose.Schema({
	value: {type: String, required: true },
	type: {type: String, required: true , default: ''}
});


var KeyRecord = mongoose.model('KeyRecord', KeyRecordSchema);

module.exports = KeyRecord;