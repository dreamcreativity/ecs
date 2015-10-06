var mongoose = require('mongoose');

var AgentInvitationSchema = new mongoose.Schema({
	agentId: {type: String, required: true },
	code: {type: String, required: true },
	email: {type: String, required: true },
	isActive: {type : Boolean, default : false },
	createDate : {type : Date, default : Date.now },
	updateDate : {type : Date, default : Date.now }
});


var AgentInvitation = mongoose.model('AgentInvitation', AgentInvitationSchema);

module.exports = AgentInvitation;