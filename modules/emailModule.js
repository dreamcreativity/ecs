var nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');
var Email = require('../models/email');
var fs = require("fs");





//var email = 'esc@dreamcwc.com';
var email = 'esc.mailsys@gmail.com';
var transporter = nodemailer.createTransport(smtpTransport({
	host: "smtp.gmail.com", // hostname
    secure: false, // use SSL
    port: 587, // port for secure SMTP
    auth: {
        user: email,
        pass: 'Asdf_1234'
    }
}));


exports.getEmailTemplate = function(templateName, callback){
	fs.readFile( './emailTemplates/'  + templateName, 'utf8', function (err,data) {
		if (err) {
			return console.log(err);
		}
		callback(data);
	});
}

exports.replaceEmailTemplate = function(templateName, info){
	var template = templateName;
	for(var key in info){
		var replaceValue =info[key];
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
			if(err) message ="Fail";
			else message = "Success";
			for (var i = 0; i < attachments.length; i++) {
				fs.unlinkSync(attachments[i]);
			};
			callback(message);
		})
				//callback("Success");
	}
	else {
		transporter.sendMail(message, function(err, result){
			if(err) message ="Fail";
			else message = "Success";
			callback(message);
		});
		//callback("Success");
	}



	// callback("Success");
}