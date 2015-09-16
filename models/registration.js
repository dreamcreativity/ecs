var mongoose = require('mongoose');

var RegistrationSchema = new mongoose.Schema({
	//Step 1 
	firstname: {type: String, required: true },
	lastname : {type: String, required: true },
	gender : {type: String, required: true },
	birthday : {type: String, required: true},
	age : {type: Number, required: true},
	citizenship : {type: String, required: true},
	address : {type: String, required: true},
	postcal : {type: String, required: true},
	city : {type: String, required: true},
	province : {type: String, required: true},
	country : {type : String, required: true},
	telephone : {type: String, required: true},
	fax : {type: String},
	email : {type: String, required: true},
	emergency :{type: String, required: true},
	isHomeCountryAddress: {type:Boolean, required:true,default:false},
	//Step 2 
	englishLevel : {type: String},
	toefl : {type: Number},
	ielts : {type: Number},
	healthInsurance_endDate :{type: Date},
	healthInsurance_startingDate :{type: Date},
	coursesList : [],
	//Step 3
	ishomestay :{type: String},
	accommodation_way : {type: String},
	homestay_option : {type: String},
	accommodation_startingDate : {type: Date},
	accommodation_finishingDate : {type: Date},
	flight_arrivalDateTime : {type: Date},
	flight_airline_arr : {type: String},
	isPickup : {type:Boolean, required:true,default:false},
	flight_departureDateTime : {type: Date},
	flight_airline_dep : {type: String},
	flight_No_dep : {type: String},
	isdropOff : {type:Boolean, required:true,default:false},
	IsSmoke : {type:Boolean, required:true,default:false},
	IswithSmoker : {type:Boolean, required:true,default:false},
	IswithPet : {type:Boolean, required:true,default:false},
	Iswithchildren : {type:Boolean, required:true,default:false},
	hobbies : {type: String},
	occupation : {type: String},
	comments : {type: String},
	special_food : {type: String},
	allergies_medical : {type: String},
	IsPrivate : {type:Boolean, required:true,default:false}
});




var Registration = mongoose.model('Registration', RegistrationSchema);

module.exports =Registration;