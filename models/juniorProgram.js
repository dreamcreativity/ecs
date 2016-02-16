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
	telephone : {type: String, required: true},
	email : {type: String, required: true},
	nationality : {type: String, required: true},
	nativeLanguage : {type: String, required: true},

	emergencyContactname :{type: String, required: true},
	emergencyPhone :{type: String, required: true},
	emergencyContactemail :{type: String, required: true},

	ismedical : {type : Boolean, default: false },
	medicalComment : {type:String},
	isallergies : {type : Boolean, default: false },
	allergiesComment: {type:String},
	isdietary : {type : Boolean, default: false },
	dietaryComment: {type:String},
	iselse : {type : Boolean, default: false },
	elseComment : {type:String},
	note: {type: String},
	registerDate: {type: Date,default: Date.now },

	durationSummerKidsProgram : {type:String},
	durationSummerTeensProgram : {type:String},
	durationSummerTeensProgramKingston : {type:String},

    startdateSummerKidsProgram : {type:String},
    startdateSummerTeensProgramKingston : {type:String},
    startdateSummerTeensProgramTonronto : {type:String},

    year_roundPrograms: {type:String},


	arrivalDateTime:{type: Date},
	arrivalAirline : {type:String},
	isPickup : {type:Boolean, default:false},
	departureDateTime:{type: Date},
	departureAirline : {type:String},
	isDropoff : {type:Boolean, default:false},

	agency : {type: String},
	agent : {type: String},
	agent_phone : {type: String},
	agent_email : {type: String}


});


var JuniorProgram = mongoose.model('JuniorProgram', JuniorProgramSchema);

module.exports =JuniorProgram;