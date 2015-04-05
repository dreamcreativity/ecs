var mongoose = require('mongoose');


var StaffSchema = mongoose.model('Staff', new mongoose.Schema({
	username: {type: String, required: true },
	password: {type: String, required: true },
	token: {type: String, default: null},
	firstname: {type: String, required: true },
	lastname: {type: String, required: true },
	email: {type: String, required: true },
	workphone: {type: String, required: true },
	cellphone: {type: String, required: true },
	role : {type : String, required: true},
	region : {type : String, required : true},
	regions : [String],
	isDelete : {type : Boolean, default : false },
	createDate : {type : Date, default : Date.now },
    updateDate : {type : Date, default : Date.now },
    lastLoginDateTime : {type : Date, default : Date.now },
    lastLoginIP : {type:String, default:null}

}));


var Staff = mongoose.model('Staff', StaffSchema);

module.exports =Staff;