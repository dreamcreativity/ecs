var mongoose = require('mongoose');

var AgentInvitationSchema = new mongoose.Schema({
	agent: {type: mongoose.Schema.ObjectId, ref : 'Agent'},
	createDate : {type : Date, default : Date.now }
});


var AgentInvitation = mongoose.model('AgentInvitation', AgentInvitationSchema);

module.exports = AgentInvitation;