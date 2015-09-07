var nodemailer = require('nodemailer');
var Email = require('../models/email');
var fs = require("fs");

var transporter = nodemailer.createTransport({
	service : 'gmail',
	auth : {
		user: 'cheng.sun@omittech.com',
		pass: 'Woaini123'
	}
});


exports.sendEmail = function(to,subject,context,attachments, callback){
	var message = {
		from : "cheng.sun@omittech.com",
		to : to,
		subject : subject,
		html : context,
		attachments : []
		};
	if(attachments !=null){
		for (var i = 0; i < attachments.length; i++) {
			message["attachments"].push({filename: "attachment_" + i, path:attachments[i]});
		};
				transporter.sendMail(message,function(err, success){
					if(err) message ="Fail to send email";
					else message = "Success to send email";
					callback(message);
				})
	}
	else {
		transporter.sendMail(message, function(err, result){
			if(err) message ="Fail to send email";
			else message = "Success to send email";
			callback(message);
		});
	}
}