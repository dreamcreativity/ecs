var mongoose = require('mongoose');


var KeyRecordSchema = new mongoose.Schema({
	key: {type: String, required: true },
	type: {type: String, required: true , default: ''},
	count: {type: Number, default: 1, required: true}
});


var KeyRecord = mongoose.model('KeyRecord', KeyRecordSchema);

module.exports = KeyRecord;