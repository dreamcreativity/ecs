var mongoose = require('mongoose');
var Promotion = require('../models/promotion');

//GET: all Pormotions
exports.getAllPormotions = function (req,res){
	Promotion.find({},function(err,results){
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

//POST: create new Promotion
exports.create = function(req,res){
	var newPromotion = new Promotion(req.body);
	newPromotion.save(function(err ,result){
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

//PUT : Edit Promotion
exports.edit = function (req,res) {
	var id = req.params.id;
	var promotion = new Promotion(req.body);
	Promotion.update({_id:id}, promotion, function(err, result){
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


//GET: promotion by Id
exports.getPromotionbyId = function(req,res){
	var id = req.params.id;
	Material.find({_id:id}, function(err, result){
		if(err) {
			res.json({
				status: 'fail',
				messages: err,
				data: null
			});
		}
		if(result.length == 1){
			res.json({
				status: 'ok',
				messages: 'successed',
				data: result[0]
			});	
		}else{
			res.json({
				status: 'fail',
				messages: "multipulte result",
				data: null
			});
		}
		
	});
}
