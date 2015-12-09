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

	
	var id = req.params.id;
	TestQuestion.find({}, function(err, result){

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