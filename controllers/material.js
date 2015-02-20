var Material = require('../models/material');
var mongoose = require('mongoose');

//POST: create new Material
exports.create = function(req,res){
	var newMaterial = new Material(req.body);
	newMaterial.save(function(err ,result){
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

//GET: material by Id
exports.getMaterialbyId = function(req,res){
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


//PUT: 
exports.edit = function(req,res){
	var id = req.params.id;
	var material = new Material(req.body);
	Material.update({_id:id}, material, function(err, result){
		if(err){
			res.json({
				status: 'fail',
				messages: err,
				data: null
			});
		}
		else {
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
		}
	});
}

//DELETE : Set Material isDelete be true
exports.delete = function(req,res){
	var id = req.params.id;
	Material.find({_id:id}, function(err,result){
		if(err){
			res.json({
				status:'fail',
				messages: err, 
				data:null
			});
		}
		else {
			result[0]["isDelete"] =true;
			Material.update({_id:id}, result[0], function(err,result){
				if(err){
					res.json({
						status:'fail',
						messages: err, 
						data:null
					});
				}
				else {
					res.json({
						status: 'ok',
						messages: 'successed',
						data: null
					});	
				}
			});
		}
	});
}

