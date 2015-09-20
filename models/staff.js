var mongoose = require('mongoose');


var StaffSchema = new mongoose.Schema({
	username: {type: String, required: true },
	password: {type: String, required: true },
	position: {type: String, required: true },
	//token: {type: String, default: null},
	cover: {type:  mongoose.Schema.ObjectId, ref:'Media', default:null},
	description: {type: String, default: ''},
	firstname: {type: String, required: true },
	lastname: {type: String, required: true },
	email: {type: String, required: true },
	workphone: {type: String, required: true },
	cellphone: {type: String, required: true },
	role : {type : String, required: true},
	facebook: {type: String, default: '' },
	linkedIn: {type: String, default: '' },
	googlePlus: {type: String, default: '' },
	region : {type : String},
	regions : [String],
	isShowOnHomePage : {type : Boolean, default : false },
	isDelete : {type : Boolean, default : false },
	createDate : {type : Date, default : Date.now },
    updateDate : {type : Date, default : Date.now },
    lastLoginDateTime : {type : Date, default : Date.now },
    lastLoginIP : {type:String, default:null}

});


var Staff = mongoose.model('Staff', StaffSchema);

module.exports =Staff;