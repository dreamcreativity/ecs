var mongoose = require('mongoose');

var RegionSchema = mongoose.model('Region', new mongoose.Schema({
	name: {type: String, required: true },
}));


var Region = mongoose.model('Region', RegionSchema);

module.exports =Region;