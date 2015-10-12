var nodemailer = require('nodemailer');
var Email = require('../models/email');
var fs = require("fs");

var email = 'esc.mailsystem@gmail.com';
var transporter = nodemailer.createTransport({
	service : 'gmail',
	auth : {
		user: email,
		pass: 'Asdf_1234'
	}
});


exports.getEmailTemplate = function(templateName, callback){

	fs.readFile('./EmailTemplates/' + templateName, 'utf8', function (err,data) {
		if (err) {
			return console.log(err);
		}
		callback(data);
	});

}

exports.replaceEmailTemplate = function(templateName, studentinfo){
	var template = templateName;
	for(var key in studentinfo){
		var replaceValue = studentinfo[key];
		template = template.replace('@' + key + '@', replaceValue);
	}
	return template;
}



exports.sendEmail = function(to,subject,context,attachments,callback){
	var message = {
		from : email,
		to : to,
		subject : subject,
		html : context,
		attachments : []
		};
	if(attachments !=null){
		for (var i = 0; i < attachments.length; i++) {
			message["attachments"].push({filename: "attachment_" + i +".pdf", path:attachments[i]});
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