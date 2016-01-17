 var Agent = require('../models/agent');
 var AgentInvitation = require('../models/agentInvitation');
 var mongoose = require('mongoose');
 var Token = require('../models/token');
 var async = require("async");
 var emailModule = require('../modules/emailModule');
 var uuid = require('node-uuid');
 var constant = require('../constants.js');
 var EmailSender = require('../modules/emailModule');

 exports.login = function(req,res){
 	Agent.findOne({username : req.body.username, password: req.body.password}, function(err, user){
 		if(err){
 			res.json(
 			{
 				status: 'fail',
 				messages: err,
 				data: null
 			});
 		}
 		if(user !=null) {
 			if(user.isActive == false) {
 				var newToken = new Token();
 				newToken.user = user._id;
 				newToken.type = 'Agent';
 				newToken.save();

 				res.json({
 					status: 'resetpassword',
 					messages : 'reset your password when you first login',
 					data : user,
 					token: newToken.id
 				});
 			}
 			else {
 				var newToken = new Token();
 				newToken.user = user._id;
 				newToken.type = 'Agent';
 				newToken.isActived = true;
 				newToken.save();

 				res.json({
 					status: 'ok',
 					messages: 'successed',
 					data : {
 						id: user.id,
 						username : user.username,
 						email: user.email,
 						token: newToken.id
 					}
 				});
 			}
 		}

 		else {
 			res.json({
				status: 'fail',
				messages: "user is not existing or password is incorrect",
				data: null
			});
 		}
 	});
 }

 exports.getAgentbyToken = function(req,res){
 	var token = req.body.token;
 	Token.findOne({_id:token}, function(err, result){
 		if(err){
 			res.json({
 				status: 'fail',
 				messages: err,
 				data: null
 			})
 		}
 		else{
 			Agent.findOne({_id:result.user}, function(err, result2){
 				if(err){
 					res.json({
 						status: 'fail',
 						messages: err,
 						data: null
 					})
 				}
 				else {
 					res.json({
 						status: 'successed',
 						messages: 'ok',
 						data: result2
 					});
 				}
 			});
 		}
 	});
 }

 exports.resetpassword = function(req,res) {
 	var pwd = req.body.password;
 	Token.findOne({_id : req.body.token}, function(err, result){
 		if(err){
 			res.json({
 				status: 'fail',
 				messages: err,
 				data: null
 			})
 		}
 		else {
 			Agent.findOne({_id:result.user}, function(err, result2){
 				if(err){
 					res.json({
 						status: 'fail',
 						messages: err,
 						data: null
 					})
 				}
 				else {
 					result2.password = pwd;
 					result2.isActive = true;
 					Agent.update({_id: result2._id}, result2, function(err, result3){
 						if(err) {
 							res.json({
 								status: 'fail',
 								messages: err,
 								data: null
 							});
 						}
 						else {
 							res.json({
 								status: 'ok',
 								messages: 'reset successed',			
 							});
 						}
 					});
 				}
 			});
 		}
 	});
 }

 exports.resetpasswordInProfile = function(req,res){
 	var oldpw = req.body.oldpassword;
 	var newpw = req.body.password;
 	Token.findOne({_id : req.body.token}, function(err, result){
 		if(err){
 			res.json({
 				status: 'fail',
 				messages: err,
 				data: null
 			})
 		}
 		else {
 			Agent.findOne({_id:result.user}, function(err, result2){
 				if(err){
 					res.json({
 						status: 'fail',
 						messages: err,
 						data: null
 					})
 				}
 				else {
 					if(result2.password == oldpw){
 						result2.password = newpw;
 						Agent.update({_id: result2._id}, result2, function(err, result3){
 							if(!err){
 								res.json({
 								status: 'ok',
 								messages: 'reset successed',			
 								});
 							}
 						});
 					}
 					else {
 						res.json({
 								status: 'fail',
 								messages: 'old password is incorrect',
 								data: null			
 							});
 					}

 				}
 			});

 		}
 	});
 }



//POST: create new Agent
exports.create = function(req,res){
	var newAgent = new Agent(req.body);
	Agent.find({'username' : newAgent.username}, function(err, result){
		if (err) {
			res.json({
				status: 'fail',
				messages: err,
				data:null
			});
		}
		if(result.length != 0){
			if(result[0].username){
				res.json({
					status: 'exist',
					messages: 'Username or email has already existed',
					data:null
				});
			}
			else{
				res.json({
					status: 'exist',
					messages: 'Email already exists',
					data:null
				});
			}
		}
		else{
			newAgent.save(function(err ,result){
				if(err){
					res.json({
						status: 'fail',
						messages: err,
						data:null
					});
				}
				else {
					res.json({
						status: 'ok',
						messages: 'successed',
						data: result
					});	
				}
			});
		}
	});
}

//GET: all Agents
exports.getAgents = function (req,res){
	Agent.find({},function(err,results){
		if(err){
			res.json(
			{
				status: 'fail',
				messages: err,
				data: null
			});			
		}
		else {
			res.json({
				status: 'ok',
				messages: 'successed',
				data: results
			});	
		}	
	});
}

//GET: Agent by Id
exports.getAgentbyId = function(req,res){
	var id = req.params.id;

	console.log(  'this is region id: ' +id);
	Agent.find({_id:id}, function(err, result){
		if(err) {
			res.json({
				status: 'fail',
				messages: err,
				data: null
			});
		}
		if(result.length == 1){
			res.json({
				status: 'ok',
				messages: 'successed',
				data: result[0]
			});	
		}else{
			res.json({
				status: 'fail',
				messages: "multipulte result",
				data: null
			});
		}
		
	});
}

//GET: agents by region name

exports.getAgentsbyRegion = function(req,res){
	var regionName = req.params.name;
	Agent.find({region:regionName}, function(err, result){
		if(err){
			res.json(
			{
				status: 'fail',
				messages: err,
				data: null
			});			
		}
		else {
			res.json({
				status: 'ok',
				messages: 'successed',
				data: result
			});	
		}	
		
	});
}


//PUT: 
exports.edit = function(req,res){
	var id = req.params.id;
	//var agent = new Agent(req.body);
	Agent.update({_id:id}, req.body, function(err, result){
		if(err){
			res.json({
				status: 'fail',
				messages: err,
				data: null
			});
		}
		else {		
			res.json({
				status: 'ok',
				messages: 'successed',
				data: result[0]
			});				
		}});
}


//DELETE : Set Agent isDelete be true
exports.delete = function(req,res){
	var id = req.params.id;
	Agent.find({_id:id}, function(err,result){
		if(err){
			res.json({
				status:'fail',
				messages: err, 
				data:null
			});
		}
		else {
			result[0]["isDelete"] =true;
			Agent.update({_id:id}, result[0], function(err,result){
				if(err){
					res.json({
						status:'fail',
						messages: err, 
						data:null
					});
				}
				else {
					res.json({
						status: 'ok',
						messages: 'successed',
						data: null
					});	
				}
			});
		}
	});
}


//Send Agent Invitation to student
exports.sendInvitation = function(req,res){
var email = req.body.email;
var agentId = req.body.agentId;

AgentInvitation.find({agent : agentId}).populate('agent').exec(function(err, result){
	if(!err && result.length>0){
		for (var key in constant.AgentInvitationTemplateVars) {
			constant.AgentInvitationTemplateVars[key] = result[0].agent[key];
		};
		constant.AgentInvitationTemplateVars['url'] = "http://" + req.headers.host + "/register/" + result[0]._id
		EmailSender.getEmailTemplate('invitation.html',function(data){
			var context = EmailSender.replaceEmailTemplate(data, constant.AgentInvitationTemplateVars);
			var to = email;
			var subject = "Register Invitation";
			var context = context;
			EmailSender.sendEmail(to,subject,context,null, function(message){		
				res.json(
				{
					returnmessage : message
				});		
			});
		});
	}
	else {
		var agentInvitation = new AgentInvitation();
		agentInvitation.agent = agentId;
		agentInvitation.save(function(err, result){
			if(!err){
				AgentInvitation.find({agent:result.agent}).populate('agent').exec(function(err, result1){
					if(!err){
						for (var key in constant.AgentInvitationTemplateVars) {
							constant.AgentInvitationTemplateVars[key] = result1[0].agent[key];
						};
						constant.AgentInvitationTemplateVars['url'] = "http://" + req.headers.host + "/register/" + result1[0]._id;
						EmailSender.getEmailTemplate('invitation.html',function(data){
							var context = EmailSender.replaceEmailTemplate(data, constant.AgentInvitationTemplateVars);
							var to = email;
							var subject = "Register Invitation";
							var context = context;
							EmailSender.sendEmail(to,subject,context,null, function(message){		
								res.json(
								{
									returnmessage : message
								});		
							});
						});
					}
				});
			}
		})
	}

})

}


exports.sendNotificationForResetPassword = function(req,res){
	var agent = req.body.agent;
	var send_list =[];
	if(agent) {
		send_list.push(agent.email);
	}
	send_list.push('esc.mailsystem@gmail.com');
	for (var key in constant.ResetPasswordTemplateVars) {
		constant.ResetPasswordTemplateVars[key] = agent[key];
	};
	constant.ResetPasswordTemplateVars['type'] = 'Agent';
	constant.ResetPasswordTemplateVars['url'] = "http://" + req.headers.host + "/agent/login";
	EmailSender.getEmailTemplate('resetpassword.html',function(data){
		var context = EmailSender.replaceEmailTemplate(data, constant.ResetPasswordTemplateVars);

		var to = send_list;
		var subject = "Reset password";
		var context = context;
		EmailSender.sendEmail(to,subject,context,null, function(message){		
			res.json(
				{
					returnmessage : message
				});		
		});
	})
}

exports.sendEmailForRegister = function(req,res){
	var agent = req.body.agent;
	agent.password =req.body.password;
	var send_list =[];
	if(agent) {
		send_list.push(agent.email);
	}
	for (var key in constant.EmailAgentTempaleVars) {
		constant.EmailAgentTempaleVars[key] = agent[key];
	};
	constant.EmailAgentTempaleVars['password'] = agent.password;
	constant.EmailAgentTempaleVars['url'] = "http://" + req.headers.host + "/agent/login";
	EmailSender.getEmailTemplate('registerSuccessForAgent.html',function(data){
		var context = EmailSender.replaceEmailTemplate(data, constant.EmailAgentTempaleVars);

		var to = send_list;
		var subject = "Register success";
		var context = context;
		EmailSender.sendEmail(to,subject,context,null, function(message){		
			res.json(
				{
					returnmessage : message
				});		
		});
	})
}







