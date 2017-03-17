var mongoose = require('mongoose');


var StickerSchema = new mongoose.Schema({
	title: {type: String, required: true },
	type: {type: String, required: true, default: '' },
	content: {type: String,  default: '' },
	createDate : {type : Date, default : Date.now },
    updateDate : {type : Date, default : Date.now }
});


var Sticker = mongoose.model('Sticker', StickerSchema);

module.exports =Sticker;