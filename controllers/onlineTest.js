var TestQuestion = require('../models/testQuestion');
var mongoose = require('mongoose');
var async = require("async");


exports.getNew = function(req,res){

	var newQuestion = new TestQuestion();
	

	res.json({
		status: 'ok',
		messages: 'successed',
		data: newQuestion
	});
	
	
}

exports.create = function(req,res){


	console.log('-----------------');
	console.log(req.body);

	var newTestQuestion = new TestQuestion(req.body.question);
	//newTestQuestion.answers = req.body.answers;
	console.log(newTestQuestion);
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