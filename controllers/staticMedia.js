
var constant = require('../constants.js');
var StaticEvent = require('../models/staticEvent');
var StaticMedia = require('../models/staticMedia');
var mongoose = require('mongoose');
var async = require("async");




var getStaticMediaRecordByType = function (req,res,type,recall){

	var indexTotal = constant.StaticMediaTypeIndex[type];

	StaticMedia.find({type:type}).populate('media').exec(function(err, result){
		if(err) {
			res.json({
				status: 'fail',
				messages: err,
				data: null
			});
		}

		if(result.length == 0){

			console.log('create new list');
			
			var objectList = [];
			
			for (var i = 1; i <= indexTotal ; i++) {
				objectList.push({
					type: type,
					typeIndex : i
				});
			}


			async.each(objectList, function(staticMediaObject, callback) {

				var newStaticMedia = new StaticMedia(staticMediaObject);

				newStaticMedia.save(function(err ,newdata){
					callback();
				});

			}, function(err){
			    if (err) {
			      console.log('A static media record create fail');
			    } else {

			    	if(recall){
						res.json({
							status: 'fail',
							messages: 'error when create new static media records',
							data: null
						});
			    	}else{
			    		getStaticMediaRecordByType(req,res,type);	
			    	}
			    	
			    }
			});



		}else{	
			// just return the list
			res.json({
				status: 'ok',
				messages: 'successed',
		 		data: result
			});
		}
		

	});

}

var updateStaticMediaRecordByType = function (req, res, type, typeIndex){

	StaticMedia.update({type:type, typeIndex: typeIndex}, req.body, function(err, result){
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



var getStaticMediaRecord = function (req,res,recordId,type){
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
				type: type
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
	getStaticMediaRecord(req,res, id, 'AcademyCalendar');
}


exports.updateCurrentAcademyCalendar = function(req,res){
	var id = constant.StaticMediaId.CurrentAcademyCalendar;
	updateStaticMediaRecord(req,res,id, 'AcademyCalendar');
}


exports.getFutureAcademyCalendar = function(req,res){
	var id = constant.StaticMediaId.FutureAcademyCalendar;
	getStaticMediaRecord(req,res, id, 'AcademyCalendar');
}


exports.updateFutureAcademyCalendar = function(req,res){
	var id = constant.StaticMediaId.FutureAcademyCalendar;
	updateStaticMediaRecord(req,res,id, 'AcademyCalendar');

}


exports.getActivityCalendar = function(req,res){
	getStaticMediaRecordByType(req,res,'ActivityCalendar');
}


exports.updateActivityCalendar = function(req,res){
	console.log(req.body);
	async.each(req.body.calenders, function(staticMediaObject, callback) {

		if(staticMediaObject != null){

			console.log('----------------------------');
			console.log(staticMediaObject);
			StaticMedia.update({_id:staticMediaObject._id}, staticMediaObject, function(err, result){
				callback();
			});
			// staticMediaObject.newAgent.save(function(err ,result){

			// 	callback();	
			// });
			
		}else{
			callback();
		}


	}, function(err){


	    if (err) {
	      console.log('a static media record update fail');
			res.json({
				status: 'fail',
				messages: 'error when create new static media records',
				data: null
			});
	    } else {

			res.json({
				status: 'ok',
				messages: 'successed',
				data: null
			});
	    }
	});

}
























