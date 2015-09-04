var mongoose = require('mongoose');
var Registration = require('../models/registration');
var EmailSender = require('../modules/emailModule');


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

exports.generatePDF = function (req,res){
	var id = req.body.registerId;
	var variables_list = [];
	Registration.find({_id : id}, function(err, result){
		if(err){
			res.json(
			{
				status: 'fail',
				messages: err,
				data: null
			});			
		}
		else {
			var registration = new Registration(result);
			var html = "<p><% Firstname %></p><p><% Lastname %></p><p><% Gender %></p><p><% From %></p>";
			variables_list.push({});
		}
	})
}

exports.sendEmail = function(req,res){
	var message = "";
	var from = req.body.from;
	var to = req.body.to;
	var subject = req.body.subject;
	var context = req.body.context;
	var attachment = req.body.attachment;
	EmailSender.sendEmail(from,to,subject,context,attachment, function(message){
		res.json(
			{
				returnmessage : message
			});		
	});
}
















