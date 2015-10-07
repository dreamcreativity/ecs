var mongoose = require('mongoose');

var AccommodationSchema = new mongoose.Schema({
	isHomestay: {type: Boolean,default:false},
	option : {type: String},
	startDate : {type : Date},
	endDate : {type : Date},
	numOfWeeks : {type : Number},
	isSmoke : {type: Boolean, default:false},
	isSpecialFood : {type: Boolean, default:false},
	isAllergies : {type: Boolean, default:false},
	isWithSmoke : {type: Boolean, default:false},
	isWithPet : {type: Boolean, default:false},
	isWithKid : {type: Boolean, default:false},
	hobbies : {type: String},
	occupation : {type: String},
	comments : {type: String},
	specialFood : {type: String},
	allergiesMedical : {type: String},
	isPrivateBathroom : {type:Boolean, default:false},
	departureDateFromToronto : {type : Date}
});

var Accommodation = mongoose.model('Accommodation', AccommodationSchema);

module.exports =Accommodation;