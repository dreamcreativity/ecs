var mongoose = require('mongoose');


var StaffSchema = mongoose.model('Staff', new mongoose.Schema({
	username: {type: String, required: true },
	password: {type: String, required: true },
	firstname: {type: String, required: true },
	lastname: {type: String, required: true },
	email: {type: String, required: true },
	workphone: {type: String, required: true },
	cellphone: {type: String, required: true },
	extension: {type: String, required: true },
	created: Date,
	modified: Date

}));


var Staff = mongoose.model('Staff', StaffSchema);

module.exports =Staff;