var mongoose = require('mongoose');

var RegistrationSchema = mongoose.model('Registration', new mongoose.Schema({
	firstname: {type: String, required: true },
	lastname : {type: String, required: true },
	gender : {type: String, required: true }
}));

var Registration = mongoose.model('Registration', RegistrationSchema);

module.exports =Registration;