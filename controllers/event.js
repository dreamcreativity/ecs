var Event = require('../models/event');
var mongoose = require('mongoose');
var async = require("async");

//POST: create new event
exports.create = function(req,res){
	var newEvent = new Event(req.body);
	newEvent.save(function(err ,result){
		if(err){
			res.json({
				type:false,
				data:"Error occured: " +err
			});
		}
		res.json({
			type:true,
			data:result
		});
	});
}


// //PUT : Edit event
exports.edit = function (req,res) {
var id = req.params.id;
var _event = new Event(req.body);

	async.series([

		function(next){
			if (req.body.cover != null)
	    		req.body.cover =  req.body.cover._id;
	    	console.log(req.body);
	    	req.body.date = new Date();

	    	
	    	next();
	    	
	    },

	], function(){

		Event.update({_id:id}, req.body, function(err, result){
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
	});


}


//GET all events
exports.get = function(req,res){
Event.find({}).populate('cover').exec(function(err,results){
	if(err){
		res.json(
			{
				type: true,
				data: 'Error occured: ' + err
			});			
			}
	res.json({
		type: true,
		data: results
	});
});
}

//GET: Activity by Id
exports.getEventbyId = function(req,res){
	var id = req.params.id;
	Event.find({_id:id}).populate('cover').exec(function(err, results){
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
		 		data: results[0]
			});
	});
}
