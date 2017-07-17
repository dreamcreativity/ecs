var mongoose = require('mongoose');


var PartnerToCategorySchema = new mongoose.Schema({
	cover: {type:  String},
	report: {type: String},
});


var PartnerToCategory = mongoose.model('PartnerToCategory', PartnerToCategorySchema);

module.exports =PartnerToCategory;