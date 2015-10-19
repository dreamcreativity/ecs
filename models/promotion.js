var mongoose = require('mongoose');

var Promotionchema = new mongoose.Schema({
	startDate: {type: Date, required: true },
	endDate : {type: Date, required: true },
	region : {type: String, required: true  },
	rate : {type : Number, default : 0},
	isDelete : {type : Boolean, default : false }
});

var Promotion = mongoose.model('Promotion', Promotionchema);

module.exports =Promotion;

