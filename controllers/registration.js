var mongoose = require('mongoose');
var Registration = require('../models/registration');
var EmailSender = require('../modules/emailModule');
var Pdf = require('../modules/pdfModule');
var constant = require('../constants.js');


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
			var obj = result[0];
			for (var key in constant.RegistrationTemplateVars) {
					constant.RegistrationTemplateVars[key] = obj[key];
				};
			Pdf.getPdfTemplate('registration.html',function(data){

				var htmlTemplate = data;
				htmlTemplate = Pdf.replaceTamplateValue(htmlTemplate,constant.RegistrationTemplateVars);


				// replate variables
				Pdf.generatePDF(htmlTemplate, function(message, path){
					if(message == "success"){
						res.json({
							status: 'successed',
							data : path
						});
					}
					else {
						res.json({
							status: 'fail',
							data : null
						});
					}
				});
			});
		}
	})
}

exports.sendEmail = function(req,res){
	var message = "";
	var to = req.body.to;
	var subject = req.body.subject;
	var context = req.body.context;
	var attachments = req.body.attachments;
	EmailSender.sendEmail(to,subject,context,attachments, function(message){
		res.json(
			{
				returnmessage : message
			});		
	});
}
















