var mongoose = require('mongoose');
var Sticker = require('../models/sticker');
var async = require("async");
var constant = require('../constants.js');


exports.getAll = function(req,res){ 


	Sticker.find().exec(function(err, result){

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



exports.get = function(req,res){ 

	var id = req.params.id;
	Sticker.findOne({_id:id}).populate('cover').exec(function(err, result){
	//Partner.findOne({_id:id}, function(err, result){

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


exports.update = function(req,res){ 

	console.log(req.body);
	var id = req.params.id;
	Sticker.update({_id:id}, req.body, function(err, result){
		if(err){
			console.log(err);

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


exports.delete = function(req,res){ 

	var id = req.params.id;
	Sticker.find({_id:id}).remove(function(err, result){
		if(err){
			console.log(err);

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



exports.create = function(req,res){

	var newSticker = new Sticker(req.body);	

	newSticker.type = "partner";
	console.log(newSticker);

	Sticker.find( {'title' : newSticker.name}, function(err, found){
		if(err){
			res.json({
				status: 'fail',
				messages: err,
				data: null
			});
		}


		if(found.length == 0){

			newSticker.save(function(err ,result){
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


		}else{
			res.json({
				status: 'fail',
				messages: 'partner already exist',
				data: null
			});	
		}



	});
}