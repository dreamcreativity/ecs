var Staff = require('../models/staff');
var SHA256 = require("crypto-js/sha256")
var mongoose = require('mongoose');
var jwt = require('jsonwebtoken');

//POST : Create a Staff
exports.create = function(req,res){
	var newStaff = new Staff(req.body);
	Staff.findOne({username : newStaff.username}, function(err, user){
		if(err){
			res.json({
				type:false,
				data: "Error occured: " +err
			});
		}
		else {
			if(user){
				res.json({
					type:false,
					data:"User already exists"
				});
			}else {
				newStaff.password = SHA256(newStaff.password); //Encrypt
				newStaff.save(function(err,result){
					if(err){
						res.json({
							type:false,
							data:"Error occured: " +err
							});
					}
					res.json({
						type:true,
						data:result
					});
				});
			}
		}
	});
}

//POST : Login
exports.login = function (req,res){
	var pwd = SHA256(req.body.password);
	Staff.findOne({username : req.body.username, password: pwd}, function(err, user){
		if(err){
			res.json(
			{
				type: false,
				data: 'Error occured: ' + err
			});
		}
		else {
			if(user.length === 0){
				res.json(
				{
					type: false,
					data : 'username or password is incorrect'
				});
			}
			else {
				var token = jwt.sign(user,"secret", { expiresInMinutes:60*5 });
				user.token = token;
				user.save(function(err){
					if(err) {
						res.json({
							type:false,
							data : 'Error occured: ' + err
						});
					}
					res.json({
						type:true,
						token: token
					});
				});
			}
		}
	});
}

// Authorized 
exports.ensureAuthorized = function(req,res, next){
	var bearerToken;
	var bearerHeader = rea.header["authorization"];
	if(typeof bearerHeader !== 'undefined'){
		var bearer = bearerHeader.split(" ");
		bearerToken = bearer[1];
		req.token = bearerToken;
		next();
	}
	else res.send(403);
}

//GET: all staffs
exports.getAllStaffs = function (req,res){
	Staff.find({},function(err,results){
		if(err){
			res.json(
				{
					type: true,
					data: 'Error occured: ' + err
				});			
				}
		res.json({
			type: true,
			data: results
		});
	});
}

//GET: staff by Id
exports.getStaffbyId = function(req,res){
	var id = req.params.id;
	Staff.find({_id:id}, function(err, result){
		if(err) {
			res.json('Error occured: ' + err);
		}
		res.json({
			type: true,
			data: result
		});
	});
}

//PUT: 
exports.edit = function(req,res){
	var id = req.params.id;
	var staff = new Staff(req.body);
	Staff.update({_id:id}, staff, function(err, result){
		if(err){
			res.json({
				type: false,
				data: 'Error occured: ' + err}
				);
		}
		res.json({
			type:true,
			data: result
		});
	});
}

//DELETE : Set staff isDelete be true
exports.delete = function(req,res){
	var id = req.params.id;
	Staff.find({_id:id}, function(err,result){
		if(err){
			res.json({type:false, data:'Error occured: ' + err});
		}
		result[0]["isDelete"] =true;
		Staff.update({_id:id}, result[0], function(err,result){
			if(err){
			res.json({type:false, data:'Error occured: ' + err});
			}
			res.json({
				type:true,
				data: result
				});
		});
	});
}
































