var Event = require('../models/event');
var mongoose = require('mongoose');

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
Event.update({_id:id}, _event, function(err, result){
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
})
}


//GET all events
exports.get = function(req,res){
Event.find({},function(err,results){
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
	Event.find({_id:id}, function(err, results){
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
