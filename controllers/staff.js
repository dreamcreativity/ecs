var SHA256 = require("crypto-js/sha256");
var mongoose = require('mongoose');
var jwt = require('jsonwebtoken');
var session = require('express-session')
var Staff = require('../models/staff');
var Token = require('../models/token');
var crypto = require('crypto');
var async = require("async");
 var constant = require('../constants.js');
 var EmailSender = require('../modules/emailModule');

//POST : Create a Staff
exports.create = function(req,res){
	var newStaff = new Staff(req.body);	
	Staff.find( {$or: [{'username' : newStaff.username}, {'email' : newStaff.email}]}, function(err, user){
		if(err){
			res.json({
				status: 'fail',
				messages: err,
				data: null
			});
		}
		if(user.length != 0){
			if(user[0].username){
				res.json({
					status: 'exist',
					messages:"Username or email has already existed",
					data: null
				});
			}
			else {
				res.json({
					status: 'exist',
					messages: 'Email already exists',
					data:null
				});
			}
		}

		else {
				newStaff.password = SHA256(newStaff.password); //Encrypt
				newStaff.save(function(err,result){
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

//POST : Login
exports.logout = function (req,res){
	if(sessionStorage.token){
		//console.log(sessionStorage.token);
	}else{
		res.redirect('/admin/login');
	}
	// remove old token data for the current found user
	Token.find({user:sessionStorage.token}, function(err, result){
		
		 if(err)
			console.log(err);

	}).remove(function(err, result){
		if(err){
			res.json({
				status: 'fail',
				messages: 'can not remove old session data',
				data : null
			});
		}
		res.redirect('/admin');
	});
	
}


//POST : Login
exports.login = function (req,res){
	var pwd = crypto.createHash('sha256').update(req.body.password).digest("hex"); 

	Staff.findOne({username : req.body.username, password: pwd}, function(err, user){
		if(err){

			res.json(
			{
				status: 'fail',
				messages: err,
				data: null
			});
		}
		else {

			if(user == null){
				res.json(
				{
					status: 'fail',
					messages: 'username or password is incorrect',
					data : null
				});
			}
			else {

				//---------------------------------
				// found user in the database
				//---------------------------------

				// remove old token data for the current found user
				Token.find({user:user._id, isActived: true}, function(err, result){
					
					 if(err)
						console.log(err);

				}).remove(function(err, result){
					
					if(err){
						res.json({
							status: 'fail',
							messages: 'can not remove old session data',
							data : null
						});
					}

					//so now can create access token
					var newToken = new Token();
					newToken.user = user._id;
					newToken.type = 'Staff';
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

				});

			}

		}
	});
}



// Authorized 
exports.ensureAuthorized = function(req,res, next){   
	var bearerToken;
	var bearerHeader = req.header["authorization"];
	if(typeof bearerHeader !== 'undefined'){
		var bearer = bearerHeader.split(" ");
		bearerToken = bearer[1];
		req.token = bearerToken;
		next();
	}
	else res.send(403);
}


// Decode 
exports.decode =function(req,res){
	if(req.params.token !=null){
		jwt.verify(token,'secret', function(err,decode){
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
					data: decode
				});	
			}
		});
	}
	else {
		res.json(
		{
			status: 'fail',
			messages: null,
			data: null
		});			
	}
}

//GET: all staffs
exports.getAllStaffs = function (req,res){
	Staff.find({},function(err,results){
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

//GET: staff by Id
exports.getStaffbyId = function(req,res){
	var id = req.params.id;


	Staff.find({_id:id}).populate('cover').exec(function(err, result){


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

//POST: 
exports.edit = function(req,res){
	var id = req.params.id;
	Staff.update({_id:id}, req.body, function(err, result){
			if(err){
				res.json({
					status: 'fail',
					messages: "fail",
					data: null
				});
			}else{
				res.json({
					status: 'ok',
					messages: 'successed',
					data: result[0]
				});	
			}
		});
}

exports.updatePassword = function(req,res){
	var id = req.params.id;
	var pwd = crypto.createHash('sha256').update(req.body.password).digest("hex");
	req.body.password = pwd
	Staff.update({_id:id}, req.body, function(err, result){
			if(err){
				res.json({
					status: 'fail',
					messages: "fail",
					data: null
				});
			}else{
				res.json({
					status: 'ok',
					messages: 'successed',
					data: result[0]
				});	
			}
		});
}

//DELETE : Set staff isDelete be true
exports.delete = function(req,res){
	var id = req.params.id;
	Staff.find({_id:id}, function(err,result){
		if(err){
			res.json({
				status:'fail',
				messages: err, 
				data:null
			});
		}
		else {
			result[0]["isDelete"] =true;
			Staff.update({_id:id}, result[0], function(err,result){
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



//GET: staff  by session
exports.getStaffAccount = function(req,res){

	Token.find({type:'Staff', _id: req.headers.authorization } ,function(err, result){

		// res.json({

		// 	result: result
		// });

		if(result.length > 1){
			res.json({
				status: 'fail',
				messages: 'multipulte result',
				data: null
			});
		}else if(result.length == 0){
			res.json({
				status: 'fail',
				messages: 'no record found',
				data: null
			});
		}else{
			tokenRecord = result[0];
			Staff.find({ _id: mongoose.Types.ObjectId(tokenRecord.user)}).populate('cover').exec(function(err, users){


					if(err) {
						res.json({
							status: 'fail',
							messages: err,
							data: null
						});
					}

					if(users.length == 1){



						res.json({
							status: 'ok',
							messages: 'successed',
							data: {
								_id : users[0]._id,
								username: users[0].username,
								workphone: users[0].workphone,
								cellphone: users[0].cellphone,
								firstname: users[0].firstname,
								lastname: users[0].lastname,
								position: users[0].position,
								lastname: users[0].lastname,
								regions: users[0].regions,
								email: users[0].email,
								createDate: users[0].createDate,
								cover: users[0].cover,
								role: users[0].role
								

							}
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

	});

}

exports.changePassword = function(req,res){

	Token.find({type:'Staff', _id: req.headers.authorization, isActived:true } ,function(err, result){

		if(result.length > 1){
			res.json({
				status: 'fail',
				messages: 'multipulte result',
				data: null
			});
		}else if(result.length == 0){
			res.json({
				status: 'fail',
				messages: 'no record found',
				data: null
			});
		}else{

			tokenRecord = result[0];
			var pwd = crypto.createHash('sha256').update(req.body.info.currentPassword).digest("hex"); 
			Staff.find({ _id: mongoose.Types.ObjectId(tokenRecord.user), password: pwd }, function(err, users){
				if(err) {
					console.log(err);
					res.json({
						status: 'fail',
						messages: err,
						data: null
					});
				}else{
					if(users.length == 1){
						var updateUser = users[0];

						updateUser.password = SHA256(req.body.info.newPassword);

						Staff.update({_id:updateUser._id}, updateUser, function(err, result){
							if(err){
								res.json({
									status: 'fail',
									messages: "fail",
									data: null
								});
							}else{
								res.json({
									status: 'ok',
									messages: 'successed',
									data: result[0]
								});	
							}
						});

					}else{
						res.json({
							status: 'fail',
							messages: "multipulte result",
							data: null
						});
					}

				}

				
			});

		}

	});
}

exports.sendNotificationForResetPassword = function(req,res){
	var staff = req.body.staff;
	staff.password =req.body.password;
	var send_list =[];
	if(staff) {
		send_list.push(staff.email);
	}
	for (var key in constant.ResetPasswordTemplateVars) {
		constant.ResetPasswordTemplateVars[key] = staff[key];
	};
	constant.ResetPasswordTemplateVars['type'] = 'Staff';
	constant.ResetPasswordTemplateVars['url'] = "http://" + req.headers.host + "/admin/login";
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
	var staff = req.body.staff;
	staff.password =req.body.password;
	var send_list =[];
	if(staff) {
		send_list.push(staff.email);
	}
	for (var key in constant.EmailStaffTempaleVars) {
		constant.EmailStaffTempaleVars[key] = staff[key];
	};
	constant.EmailStaffTempaleVars['password'] = staff.password;
	constant.EmailStaffTempaleVars['url'] = "http://" + req.headers.host + "/admin/login";
	EmailSender.getEmailTemplate('registerSuccessForStaff.html',function(data){
		var context = EmailSender.replaceEmailTemplate(data, constant.EmailStaffTempaleVars);

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
























