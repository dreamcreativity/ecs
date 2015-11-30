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