var mongoose = require('mongoose');


var JuniorProgramSchema = new mongoose.Schema({
	firstname: {type: String, required: true },
	lastname: {type: String, required: true },
	gender : {type: String, required: true },
	birthday : {type: Date, required: true},

	address : {type: String, required: true},
	postcode : {type: String, required: true},
	city : {type: String, required: true},
	province : {type: String, required: true},
	country : {type : String, required: true},
	phone : {type: String, required: true},
	email : {type: String, required: true},
	nationality : {type: String, required: true},
	nativeLanguage : {type: String, required: true},

	emergencyContactName :{type: String, required: true},
	emergencyContactPhone :{type: String, required: true},
	emergencyContactEmail :{type: String, required: true},

	isMedication : {type : Boolean, default: false },
	isAllergies : {type : Boolean, default: false },
	isDietary : {type : Boolean, default: false },
	note: {type: String},
	registerDate: {type: Date,default: Date.now },

	startDate : {type: Date, default: Date.now },
	endDate : {type: Date, default: Date.now },
	duration : {type: String},

	arrivalDateTime:{type: Date},
	arrivalAirline : {type:String},
	isPickup : {type:Boolean, default:false},
	departureDateTime:{type: Date},
	departureAirline : {type:String},
	isDropoff : {type:Boolean, default:false},

	AgentCompany : {type: String},
	AgentName : {type: String},
	AgentEmail : {type: String},
	AgentPhone : {type: String},
	AgentWebsite : {type: String}


});


var JuniorProgram = mongoose.model('JuniorProgram', JuniorProgramSchema);

module.exports =JuniorProgram;