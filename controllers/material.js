var Material = require('../models/material');
var mongoose = require('mongoose');
var Media = require('../models/media');
var Agent = require('../models/agent')
var Region = require('../models/region')
var async = require("async");

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
	Material.find({_id:id}).populate('media').populate('agents').populate('region').exec(function(err, result){
		if(err) {
			res.json({
				status: 'fail',
				messages: err,
				data: null
			});
		}
		if(result.length == 1){
			var s = result[0];
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

	var agentList = [];
	console.log(req.body);
	async.series([
		// save each duration object in the list
		function(next){
			if(req.body.media !=null ){
				console.log(req.body);
				req.body.media = req.body.media._id;
			}	
			next();
		},

		function(next){
			
			async.eachSeries(req.body.agents, function iterator(item, callback) {
				agentList.push(item._id);
				callback();
			}, function done() {
				req.body.agents = agentList;
				next();
			});

		
		}
	], function(){
		// update
		console.log('andy is here 2');
		Material.update({_id:update_id}, req.body, function(err, result){
			if(err){
				console.log(err);
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


//GET by AgentId
exports.getByAgentId = function(req,res){
	var agent_id = req.params.id;
	Material.find({agents : agent_id}).populate('media').populate('region').exec(function(err, result){
		if(err) {
			res.json({
				status: 'fail',
				messages: err,
				data: null
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












