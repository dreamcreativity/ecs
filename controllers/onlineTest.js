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


	

	var newTestQuestion = new TestQuestion(req.body);
	newTestQuestion.save(function(err ,result){
		if(err){
			
			res.json({
				status: 'false',
				messages: 'cannot save TestQuestion',
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