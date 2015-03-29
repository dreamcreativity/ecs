var mongoose = require('mongoose');
var Region = require('../models/region');

//GET: all regions
exports.all = function (req,res){
	Region.find({},function(err,results){
		if(err){
			res.json(
			{
				status: 'fail',
				messages: err,
				data: null
			});			
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

exports.create = function (req,res){

	var newSlider = new Slider(req.body);


	newSlider.save(function(err,result){
		if(err){
			res.json({
				status: 'fail',
				messages: err,
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