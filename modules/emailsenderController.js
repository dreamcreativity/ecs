var nodemailer = require('nodemailer');
var Email = require('../models/email');

var transporter = nodemailer.createTransport({
	service : 'gmail',
	auth : {
		user: '',
		pass: ''
	}
});

var excutes = function(from,to,subject,text){
	transporter.sendMail({
		from : from,
		to : to,
		subject : subject,
		text : text
	}, function(err, result){
		console.log("email send success");
	});
}


exports.sendEmail = function(req,res){
	var emailData = new Email(req.body);
	excutes(emailData.from, emailData.to,emailData.subject, emailData.text);
}

