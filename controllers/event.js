var Event = require('../models/event');
var StaticEvent = require('../models/staticEvent');
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

	    	//req.body.date = new Date();

	    	
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





exports.getEventStatic = function(req,res){
	
	var id = '574b25acc9ae5f3b22f53b85';




	StaticEvent.findOne({_id:id}).exec(function(err, result){
		if(err) {
			res.json({
				status: 'fail',
				messages: err,
				data: null
			});
		}

		if(!result){
			console.log('record not found');

			var newStaticEvent = new StaticEvent({
				_id: id
			});

			newStaticEvent.save(function(err ,newStaticEvent){
				if(err){
					res.json({
						type:false,
						data:"Error occured: " +err
					});
				}



				res.json({
						status: 'ok',
						messages: 'successed',
				 		data: newStaticEvent
					});
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


exports.updateEventStatic = function(req,res){
	var id = '574b25acc9ae5f3b22f53b85';
	StaticEvent.find({_id:id}).populate('cover').exec(function(err, results){
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



























