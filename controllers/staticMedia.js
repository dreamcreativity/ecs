
var StaticEvent = require('../models/staticEvent');
var constant = require('../constants.js');
var StaticMedia = require('../models/staticMedia');
var mongoose = require('mongoose');
var async = require("async");





exports.getEventStatic = function(req,res){
	
	var id = '574b25acc9ae5f3b22f53b85';

	StaticEvent.findOne({_id:id}).populate('media').exec(function(err, result){
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



	StaticEvent.update({_id:id}, req.body, function(err, result){
		if(err){
			res.json({
				type: false,
				data: 'Error occured: ' + err}
				);
		}

		res.json({
			status: 'ok',
			messages: 'successed',
			data: result
		});	
	});

}








// speical case, put calendar code here ..


exports.getCalendarStatic = function(req,res){
	
	var id = '56c2a6db96c5e72979b79338';

	StaticEvent.findOne({_id:id}).populate('media').exec(function(err, result){
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


exports.updateCalendarStatic = function(req,res){


	var id = '56c2a6db96c5e72979b79338';



	StaticEvent.update({_id:id}, req.body, function(err, result){
		if(err){
			res.json({
				type: false,
				data: 'Error occured: ' + err}
				);
		}

		res.json({
			status: 'ok',
			messages: 'successed',
			data: result
		});	
	});

}






















