var mongoose = require('mongoose');

var LinkSchema = mongoose.model('Link', new mongoose.Schema({
	title: {type: String},
	url : {type: String},
	parentId{type:String}
}));

var Link = mongoose.model('Link', LinkSchema);

module.exports =Link;