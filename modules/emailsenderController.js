var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
	service : 'gmail',
	auth : {
		user: 'stiron88@gmail.com',
		pass: 'nibuzhidao123'
	}
});

exports.sendMail = function(from,to,subject,text){
	transporter.sendMail({
		from : from,
		to : to,
		subject : subject,
		text : text
	});
}