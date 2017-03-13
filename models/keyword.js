var mongoose = require('mongoose');


var KeywordSchema = new mongoose.Schema({
	value: {type: String, required: true },
	type: {type: String, required: true , default: ''}
});


var Keyword = mongoose.model('Keyword', KeywordSchema);

module.exports =Keyword;