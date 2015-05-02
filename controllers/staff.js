var SHA256 = require("crypto-js/sha256");
var mongoose = require('mongoose');
var jwt = require('jsonwebtoken');
var session = require('express-session')
var Staff = require('../models/staff');
var Token = require('../models/token');
var crypto = require('crypto');

//POST : Create a Staff
exports.create = function(req,res){
	var newStaff = new Staff(req.body);
	Staff.findOne({username : newStaff.username}, function(err, user){
		if(err){
			res.json({
				status: 'fail',
				messages: err,
				data: null
			});
		}
		else {
			if(user){
				res.json({
					status: 'fail',
					messages:"User already exists",
					data: null
				});
			}else {
				newStaff.password = '123456'  //Defalut password
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
		}
	});
}

//POST : Login
exports.logout = function (req,res){

	if(sessionStorage.token){
		console.log(sessionStorage.token);
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
				Token.find({user:user._id}, function(err, result){
					
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
	Staff.find({_id:id}, function(err, result){


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

//PUT: 
exports.edit = function(req,res){
	var id = req.params.id;
	//var staff = new Staff(req.body);
	Staff.update({_id:id}, req.body, function(err, result){
		if(err){
			res.json({
				status: 'fail',
				messages: err,
				data: null
			});
		}
		else {
			if(result == 1){
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
	
	

	Token.find({type:'Staff', _id: req.headers.api_token } ,function(err, result){

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
			console.log(tokenRecord);


			Staff.find({ _id: mongoose.Types.ObjectId(tokenRecord.user)}, function(err, users){


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
							data: {
								username: users[0].username,
								workphone: users[0].workphone,
								cellphone: users[0].cellphone,
								firstname: users[0].firstname,
								lastname: users[0].lastname

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





















