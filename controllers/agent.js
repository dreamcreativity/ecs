 var Agent = require('../models/agent');
 var AgentInvitation = require('../models/agentInvitation');
 var mongoose = require('mongoose');
 var Token = require('../models/token');
 var async = require("async");
 var emailModule = require('../modules/emailModule');
 var uuid = require('node-uuid');

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
 				newToken.type = 'agent';
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
	newAgent.password = "temp";
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
exports.sendInvitation = function(req,res) {
	var emailEnter = req.body.email;
	var token =req.body.token;
	var url = null;
	AgentInvitation.findOne({email:emailEnter}, function(err,result){
		if(err){
			res.json({
				status:'fail',
				messages: err, 
				data:null
			});
		}
		if(result !=null){
			if(result.isActive) {
				res.json({
					status: 'fail',
					messages: 'this student has already in record',
					data: null
				});
			}
			else {
				url = "http://" + req.headers.host + "/register/" + token;
				url = '<a href="' + url +'">Invitation Link</a>';   //Need to change to register form link
				console.log(url);
				emailModule.sendEmail(emailEnter,"Invitation",url,null,function(messages){
					res.json({
						status:'ok',
						messages: messages
					});
				});
			}
		}
		else{
			var agentInvitationObj = new AgentInvitation();
			agentInvitationObj.agentId = req.body.agentId;
			agentInvitationObj.code = uuid.v4();
			agentInvitationObj.email = emailEnter;
			
			agentInvitationObj.save(function(err, result){
				if(err){
					res.json({
						status:'fail',
						messages: err, 
						data:null
					});
				}
				else {
					url = req.url+result.code;
					emailModule.sendEmail(email,"Invitation",url,null,function(messages){
						res.json({
							status:'ok',
							messages: messages
						});
					});
				}
			});
		}
	});

}

