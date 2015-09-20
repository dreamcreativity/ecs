var mongoose = require('mongoose');
var Registration = require('../models/registration');
var EmailSender = require('../modules/emailModule');
var Pdf = require('../modules/pdfModule');


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
			var registration = new Registration(result[0]);
			//var html = "<p><% Firstname %></p><p><% Lastname %></p><p><% Gender %></p><p><% From %></p>";
			

			// var html = "<p>" + registration.firstname + "</p>" +"<p>" + registration.lastname + "</p>"+"<p>" + registration.gender + "</p>" +
			// 			"<p>" + registration.birthday + "</p>" +"<p>" + registration.age + "</p>"+"<p>" + registration.citizenship + "</p>" +
			// 			"<p>" + registration.address + "</p>" +"<p>" + registration.city + "</p>"+"<p>" + registration.province + "</p>" +
			// 			"<p>" + registration.postcal + "</p>" +"<p>" + registration.country + "</p>"+"<p>" + registration.telephone + "</p>" +
			// 			"<p>" + registration.fax + "</p>" +"<p>" + registration.email + "</p>"+"<p>" + registration.emergency + "</p>" +
			// 			"<p>" + registration.englishLevel + "</p>" +"<p>" + registration.toefl + "</p>"+"<p>" + registration.ielts + "</p>" +
			// 			"<p>" + registration.healthInsurance_startingDate + "</p>" +"<p>" + registration.healthInsurance_endDate + "</p>"+"<p>" + registration.ishomestay + "</p>";
			
			var htmlTemplate = '';
			Pdf.getPdfTemplate('registration.html',function(data){
				//console.log(data);
				htmlTemplate = data;

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
















