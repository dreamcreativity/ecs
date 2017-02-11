var mongoose = require('mongoose');
var Staff = require('../models/partner');
var async = require("async");
var constant = require('../constants.js');



exports.create = function(req,res){
	var newPartner = new Partner(req.body);	

	Partner.find( {$or: [{'name' : newPartner.name}, {'email' : newStaff.email}]}, function(err, partner){
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