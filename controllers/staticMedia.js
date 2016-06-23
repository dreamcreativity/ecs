
var constant = require('../constants.js');
var StaticEvent = require('../models/staticEvent');
var StaticMedia = require('../models/staticMedia');
var mongoose = require('mongoose');
var async = require("async");




var getStaticMediaRecord = function (req,res,recordId){
	StaticMedia.findOne({_id:recordId}).populate('media').exec(function(err, result){
		if(err) {
			res.json({
				status: 'fail',
				messages: err,
				data: null
			});
		}

		if(!result){
			console.log('record not found');

			// create record if not exit
			var newStaticMedia = new StaticMedia({
				_id: id,
				type: 'Calendar'
			});

			newStaticMedia.save(function(err ,newdata){
				if(err){
					res.json({
						type:false,
						data:"Error occured: " +err
					});
				}



				res.json({
						status: 'ok',
						messages: 'successed',
				 		data: newdata
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


var updateStaticMediaRecord = function (req, res, recordId){

	StaticMedia.update({_id:recordId}, req.body, function(err, result){
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

exports.getCurrentAcademyCalendar = function(req,res){
	var id = constant.StaticMediaId.CurrentAcademyCalendar;
	getStaticMediaRecord(req,res, id);
}


exports.updateCurrentAcademyCalendar = function(req,res){
	var id = constant.StaticMediaId.CurrentAcademyCalendar;
	updateStaticMediaRecord(req,res,id);
}


exports.getFutureAcademyCalendar = function(req,res){
	var id = constant.StaticMediaId.FutureAcademyCalendar;
	getStaticMediaRecord(req,res, id);
}


exports.updateFutureAcademyCalendar = function(req,res){
	var id = constant.StaticMediaId.FutureAcademyCalendar;
	updateStaticMediaRecord(req,res,id);

}

























