var mongoose = require('mongoose');

var CounterSchema = mongoose.model('Counter', new mongoose.Schema({
	_id: String,
	next : {type: Number},
}));

var Counter = mongoose.model('Counter', CounterSchema);
module.exports =Counter;