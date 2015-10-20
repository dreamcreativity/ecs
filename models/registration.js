var mongoose = require('mongoose');

var RegistrationSchema = new mongoose.Schema({

	student : {type: mongoose.Schema.ObjectId, ref:'Student', default: null},
	agent: {type: mongoose.Schema.ObjectId, ref:'Agent', default: null},
	programRegistration : [{type : mongoose.Schema.ObjectId, ref:'ProgramRegistration', default:null}],
	accommodation: {type: mongoose.Schema.ObjectId, ref:'Accommodation', default: null},
	flightInfo: {type: mongoose.Schema.ObjectId, ref:'FlightInfo', default: null},
	createDate: {type: Date,default: Date.now },
	isActive: {type: Boolean, default: true},
	payments: [{ type: Schema.Types.ObjectId, ref: 'Payment'}],

});

var Registration = mongoose.model('Registration', RegistrationSchema);
module.exports = Registration;