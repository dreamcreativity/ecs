var mongoose = require('mongoose');


var PartnerCategorySchema = new mongoose.Schema({
	name: {type: String, required: true },
	description: {type: String, default: ''},
	cover: {type:  mongoose.Schema.ObjectId, ref:'Media', default:null},
	isDelete : {type : Boolean, default : false },
	createDate : {type : Date, default : Date.now },
    updateDate : {type : Date, default : Date.now }

});


var PartnerCategory = mongoose.model('PartnerCategory', PartnerCategorySchema);

module.exports =PartnerCategory;