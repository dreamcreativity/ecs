var mongoose = require('mongoose');
var Partner = require('../models/partner');
var async = require("async");
var constant = require('../constants.js');


exports.getAll = function(req,res){ 


	Partner.find().populate('cover').exec(function(err, result){

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


	console.log('-----------------in get function');
	var id = req.params.id;
	Partner.findOne({_id:id}).populate('cover').exec(function(err, result){
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
	Partner.update({_id:id}, req.body, function(err, result){
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

	var newPartner = new Partner(req.body);	

	console.log(newPartner);

	Partner.find( {'name' : newPartner.name}, function(err, foundPartners){
		if(err){
			res.json({
				status: 'fail',
				messages: err,
				data: null
			});
		}


		if(foundPartners.length == 0){

			newPartner.save(function(err ,result){
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