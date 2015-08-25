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

exports.getById = function (id) {
	Registration.find({_id:id}, function(err, result){
		if(err) {
			return null;
		}
	    else return result[0];
	});
}