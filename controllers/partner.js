var mongoose = require('mongoose');
var Partner = require('../models/partner');
var async = require("async");
var constant = require('../constants.js');


exports.getAll = function(req,res){ 


	Partner.find(function(err, result){

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

	Partner.findOne({_id:id}, function(err, result){

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