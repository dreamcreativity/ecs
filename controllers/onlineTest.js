var TestQuestion = require('../models/testQuestion');
var TestRecord = require('../models/testRecord');
var mongoose = require('mongoose');
var EmailSender = require('../modules/emailModule');
var async = require("async");
var constants = require('../constants.js');


exports.getNew = function(req,res){

	var newQuestion = new TestQuestion();
	

	res.json({
		status: 'ok',
		messages: 'successed',
		data: newQuestion
	});
	
	
}

exports.getNewRecord = function(req,res){

	var newRecord = new TestRecord();
	

	res.json({
		status: 'ok',
		messages: 'successed',
		data: newRecord
	});
	
	
}

exports.getAll= function(req,res){

	
	TestQuestion.find({}, function(err, results){

		if(err){
			res.json({
				status: 'fail',
				messages: err,
				data: null
			});
		}else{
			res.json({
				status: 'ok',
				messages: 'successed',
				data: results
			});
		}

	});
}



exports.get= function(req,res){

	
	var id = req.params.id;
	TestQuestion.findOne({_id:id}, function(err, result){

		if(err){
			res.json({
				status: 'fail',
				messages: err,
				data: null
			});
		}else{
			res.json({
				status: 'ok',
				messages: 'successed',
				data: result
			});
		}

	});

	
	
}


exports.getTestQuestions= function(req,res){

	TestQuestion.findRandom().limit(50).exec(function (err, result) {


		if(err){
			res.json({
				status: 'fail',
				messages: err,
				data: null
			});
		}else{
			res.json({
				status: 'ok',
				messages: 'successed',
				data: result
			});
		}


	});

	// TestQuestion.find({}, function(err, result){

	// 	if(err){
	// 		res.json({
	// 			status: 'fail',
	// 			messages: err,
	// 			data: null
	// 		});
	// 	}else{
	// 		res.json({
	// 			status: 'ok',
	// 			messages: 'successed',
	// 			data: result
	// 		});
	// 	}

	// });

	
	
}


exports.save= function(req,res){

	var id = req.params.id;

	console.log('*****************');
	console.log(req.body);
	TestQuestion.update({_id: id}, req.body, function(err, result){
		if(err){
			res.json({
				type: false,
				data: 'Error occured: ' + err}
				);
		}
		res.json({
			type:true,
			data: result
		});	
	});
	
}


exports.create = function(req,res){
	
	var newTestQuestion = new TestQuestion(req.body.question);

	newTestQuestion.save(function(err ,result){
		if(err){
			
			res.json({
				status: 'false',
				messages: err,
				data: null
			});
		}else{
			res.json({
				rstatus: 'ok',
				messages: 'successed',
				data: result
			});
		}
		
	});
	
	
}


var  enhanceString = function(str){
	var result =  str.replace( /\s\s+/g, ' ' );
	result = result.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '');
	return result.toLowerCase();
}

exports.createTestRecord = function(req,res){

	var newTestRecord= new TestRecord(req.body.testRecord);


	// calculate the correct answer
	var correctCount = 0;
	for (var i = 0; i < newTestRecord.questions.length; i++) {

		newTestRecord.questions[i].answer = enhanceString(newTestRecord.questions[i].answer);
		newTestRecord.questions[i].correctAnswer = enhanceString(newTestRecord.questions[i].correctAnswer);

		var question = newTestRecord.questions[i];

		if(question.answer == question.correctAnswer)
			correctCount++;
	}
	

	newTestRecord.correctCount = correctCount;
	newTestRecord.rate = Math.round(correctCount / newTestRecord.questions.length * 100);


	newTestRecord.save(function(err ,result){
		if(err){
			
			res.json({
				status: 'false',
				messages: err,
				data: null
			});
		}else{
			res.json({
				status: 'ok',
				messages: 'successed',
				data: result
			});
		}
		
	});
	
	
}


exports.getAllRecords = function(req,res){



	TestRecord.find(function(err ,result){
		if(err){
			
			res.json({
				status: 'false',
				messages: err,
				data: null
			});
		}else{
			res.json({
				rstatus: 'ok',
				messages: 'successed',
				data: result
			});
		}
		
	});
	
	
}



exports.getRecord= function(req,res){

	
	var id = req.params.id;

	TestRecord.findOne({_id:id}, function(err, result){

		if(err){
			res.json({
				status: 'fail',
				messages: err,
				data: null
			});
		}else{
			res.json({
				status: 'ok',
				messages: 'successed',
				data: result
			});
		}

	});

}

exports.sendEmail = function(req,res){
	var student_email = req.body.email;
	var test_result =req.body.test_result;
	var result_obj = req.body.result_obj;

	if(!test_result){
		EmailSender.getEmailTemplate('onlineTestFail.html', function(data){
			var context = data;
			var to = student_email;
			var subject = 'Online Test Time out';
			var attachment = [];
			EmailSender.sendEmail(to,subject,context,attachment,function(message){
				res.json({
					returnmessage : message
				});
			});
		})
	}
	else {

		for (var key in constants.OnlineTestResult) {
			constants.OnlineTestResult[key] = result_obj[key];
		};
		async.waterfall([
		function(callback){
			EmailSender.getEmailTemplate('onlineTestSuccess.html', function(data){
			var context = EmailSender.replaceEmailTemplate(data, constants.OnlineTestResult);
			var to = student_email;
			var subject = 'Online Test Finish';
			var attachment = [];
			EmailSender.sendEmail(to,subject,context,attachment,function(message){
				res.json({
					returnmessage : message
				});
			});
		});
		},
		function(callback){
			EmailSender.getEmailTemplate('onlineTestNotifyStaff.html', function(data){
			var context = EmailSender.replaceEmailTemplate(data, constants.OnlineTestResult);
			var to = student_email;
			var subject = 'Online Test Finish';
			var attachment = [];
			EmailSender.sendEmail(to,subject,context,attachment,function(message){
				res.json({
					returnmessage : message
				});
			});
		});
		}],function(err, result){
			if(!err){
				res.json(
	 			{
	 				returnmessage : message
	 			});		
			}
		});
	}

}
















