 var Agent = require('../models/agent');
 var mongoose = require('mongoose');

//POST: create new Agent
exports.create = function(req,res){
	var newAgent = new Agent(req.body);
	newAgent.save(function(err ,result){
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

//GET: all Agents
exports.getAgents = function (req,res){
	Agent.find({},function(err,results){
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

//GET: Agent by Id
exports.getAgentbyId = function(req,res){
	var id = req.params.id;
	Agent.find({_id:id}, function(err, result){
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
	var agent = new Agent(req.body);
	Agent.update({_id:id}, agent, function(err, result){
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

//DELETE : Set Agent isDelete be true
exports.delete = function(req,res){
	var id = req.params.id;
	Agent.find({_id:id}, function(err,result){
		if(err){
			res.json({
				status:'fail',
				messages: err, 
				data:null
			});
		}
		else {
			result[0]["isDelete"] =true;
			Agent.update({_id:id}, result[0], function(err,result){
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

