var mongoose = require('mongoose');

var Promotionchema = new mongoose.Schema({
	startDate: {type: Date},
	endDate : {type: Date},
	region : {type: String },
	rate : {type : Number, default : 0},
	isDelete : {type : Boolean, default : false }
});

var Promotion = mongoose.model('Promotion', Promotionchema);

module.exports =Promotion;

