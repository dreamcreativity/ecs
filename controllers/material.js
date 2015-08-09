var Material = require('../models/material');
var mongoose = require('mongoose');
var Media = require('../models/media');
var Agent = require('../models/agent')
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

exports.all = function(req,res){

	
	Material.find({}, function(err, result){
		if(err) {
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


//GET: material by Id
exports.get = function(req,res){
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

			var s = result[0].toObject();


			if(s.media != null){
				Media.find({_id:s.media}, function(err1, result1){
					
					if(err1){
						res.json({
							status: 'fail',
							messages: "can not get result media ",
							data: null
						});
					}else{

						s.mediaObject = result1[0].toObject();
			
						// res.json({
						// 	status: 'ok',
						// 	messages: 'successed',
						// 	data: s
						// });	

					}
				});

			}

			if(s.agentIds.length != 0){
				Agent.find({} , function(agentQueryErr, agentQueryResult){

					if(agentQueryErr){

						res.json({
							status: 'fail',
							messages: "can not get result agents ",
							data: null
						});

					}else{

						console.log(agentQueryResult);

						//s.agentObject = 

					}
				});
			}


			res.json({
					status: 'ok',
					messages: 'successed',
					data: s
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
	var update_id = req.params.id;
	Material.update({_id:update_id}, req.body, {}, function(err, result){
		if(err){
			res.json({
				status: 'fail',
				messages: err,
				data: null
			});
		}
		else {

			console.log(result);
			res.json({
				status: 'ok',
				messages: 'successed',
				data: result + ' record(s) effected.'
			});	
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

