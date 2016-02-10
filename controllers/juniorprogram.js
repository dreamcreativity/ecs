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
