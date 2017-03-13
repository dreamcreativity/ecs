var mongoose = require('mongoose');


var StickerSchema = new mongoose.Schema({
	title: {type: String, required: true },
	value: {type: String, required: true },
	content:{type: String, required: true, default: ''},
	type: {type: String, required: true , default: ''}
});


var Sticker = mongoose.model('Sticker', StickerSchema);

module.exports =Sticker;