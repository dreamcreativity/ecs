var JuniorProgram = require('../models/juniorProgram');
var mongoose = require('mongoose');

//POST: create new Junior Program
exports.create = function(req,res){
	var newJuniorProgram = new JuniorProgram(req.body.student);
	newJuniorProgram.save(function(err ,result){
		if(err){
			res.json({
				status: 'fail',
				messages: err,
				data:null
			});
		}
		else {
			res.json({
				status: 'ok',
				messages: 'successed',
				data: result
			});	
		}
	});
}

//GET All Students
exports.getStudents = function(req,res){
	var studentList = [];
	JuniorProgram.find({}).exec(function(err, results){
		if(err) {
			res.json('Error occured: ' + err);
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

//GET: Student by Id
exports.getStudentbyId = function(req,res){
	var id = req.params.id;
	JuniorProgram.findOne({_id:id}).exec(function(err, result){
		if(err) {
			res.json({
				status: 'fail',
				messages: err,
				data: null
			});
		}
		else{
			res.json({
				status: 'fail',
				messages: "multipulte result",
				data: result
			});
		}
	});
}

exports.edit = function(req,res){
	var id = req.params.id;
	JuniorProgram.update({_id:id}, req.body, function(err, result){
		if(err){
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
				data: result
			});
		}
	});
}



