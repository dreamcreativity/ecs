var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var MaterialSchema = mongoose.model('Material', new mongoose.Schema({
	name: {type: String, required: true },
	description : {type: String, required: true },
	media: { type: Schema.Types.ObjectId, ref: 'Media', default: null },

	region: { type: Schema.Types.ObjectId, ref: 'Region', default: null },		
	created : {type : Date, default : Date.now },
	modified : {type : Date, default : Date.now },
	isDelete : {type : Boolean, default : false },


}));

var Material = mongoose.model('Material', MaterialSchema);

module.exports =Material;