var mongoose = require('mongoose');
var Registration = require('../models/registration');


exports.create = function (req,res){
	var newRegistration = new Registration(req.body);
	newRegistration.save(function(err,result){
		if(err){
			res.json({
				status: 'fail',
				messages: err,
				data: null
			});
		}
		res.json({
			status: 'ok',
			messages: 'successed',
			data: result
		});
	});
}

exports.getById = function (req,res) {
	var id = req.params.id;
	Registration.find({_id:id}, function(err, result){
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
			messages: 'successed',
			data: result[0]
			});
	    }
	});
}

exports.getAllRegistrations = function (req,res){
	Registration.find({},function(err,results){
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