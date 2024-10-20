var mongoose = require('mongoose');


var StudentSchema = new mongoose.Schema({
	//basic info
	studentID: {type: String},
	referenceID : {type: String},
	agent: {type: mongoose.Schema.ObjectId, ref:'Agent', default: null},
	programRegistration : [{type : mongoose.Schema.ObjectId, ref:'ProgramRegistration', default:null}],
	programName : {type: String},
	programStartDate : {type: Date},
	accommodation: {type: mongoose.Schema.ObjectId, ref:'Accommodation', default: null},
	flightInfo: {type: mongoose.Schema.ObjectId, ref:'FlightInfo', default: null},
	firstname: {type: String, required: true },
	lastname: {type: String, required: true },
	gender : {type: String, required: true },
	birthday : {type: Date, required: true},
	age : {type: Number, required: true},
	citizenship : {type: String, required: true},
	region : {type:String,required:true},
	//address
	address : {type: String, required: true},
	postcode : {type: String, required: true},
	city : {type: String, required: true},
	province : {type: String, required: true},
	country : {type : String, required: true},
	isHomeCountryAddress: {type:Boolean, default:false},
	//contact info
	telephone : {type: String, required: true},
	fax : {type: String,default: null},
	email : {type: String, required: true},
	emergency :{type: String, required: true},
	//additional info
	englishLevel : {type: String},
	TOEFL : {type: Number},
	IELTS : {type: Number},
	healthInsuranceEndDate :{type: Date},
	healthInsuranceStartingDate :{type: Date},
	//commission info
	commissionRate: {type: Number,default :0},
	pomotionRate: {type: Number, default :0},
	note: {type: String},
	registerDate: {type: Date,default: Date.now },
	isQuit : {type : Boolean, default : false },
});


var Student = mongoose.model('Student', StudentSchema);
module.exports =Student;
