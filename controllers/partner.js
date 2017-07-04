var mongoose = require('mongoose');
var Partner = require('../models/partner');
var PartnerCategory = require('../models/partnerCategory');
var Keyword = require('../models/keyword');
var KeyRecord = require('../models/keyRecord');
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

	//console.log(req.body);
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

			Keyword.find({ ref: id }).remove( function(){

				async.eachSeries(req.body.tags, function iteratee(item, callback) {
					console.log( 'item: ' + item);

					item = item.toLowerCase().split('-').join(' ');

					var newKeyword = new Keyword({
						value: item,
						type: 'partner',
						ref: id
					});

					newKeyword.save(function(err,result){

						KeyRecord.update({'key': item, 'type':'partner'},{$set : {exist: true } }, function(){
							callback();	
						});
						
					});

				}, function done() {
				    //...
				});
	

			});


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


exports.getKeyList = function(req,res){

	

	// var key = req.params.keyword;
	// key = key.toLowerCase();

	// console.log(key);
	// value :  {'$regex': key}} 

	
	Keyword.find({ type: 'partner' }).distinct( 'value', function(err, result){
		res.json({
			status: 'ok',
			messages: 'successed',
			data: result
		});
	});



}



exports.getArea = function(req,res){ 


	console.log('-----------------in get function');
	var id = req.params.id;
	PartnerCategory.findOne({_id:id}).populate('cover').exec(function(err, result){


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




exports.areaList = function(req,res){ 


	PartnerCategory.find().populate('cover').exec(function(err, result){

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


exports.createArea = function(req,res){

	var newPartnerCategory = new PartnerCategory(req.body);	

	console.log(newPartnerCategory);

	PartnerCategory.find( {'name' : newPartnerCategory.name}, function(err, foundPartnerCategory){
		if(err){
			res.json({
				status: 'fail',
				messages: err,
				data: null
			});
		}


		if(foundPartnerCategory.length == 0){

			newPartnerCategory.save(function(err ,result){
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
				messages: 'area of partner already exist',
				data: null
			});	
		}



	});
}



exports.updateArea = function(req,res){ 

	//console.log(req.body);
	var id = req.params.id;
	PartnerCategory.update({_id:id}, req.body, function(err, result){
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















