var Activity = require('../models/activity');
var Media = require('../models/media');
var mongoose = require('mongoose');

async = require("async");


//POST: create new Activity
exports.create = function(req,res){
	var newActivity = new Activity(req.body);
	newActivity.save(function(err ,result){
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


//GET: all Activities
exports.getActivities = function (req,res){
	Activity.find({},function(err,results){
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


//GET: Activity by Id
exports.getActivitybyId = function(req,res){
	var id = req.params.id;
	var activity =null;
	var mediaList = [];
	Activity.find({_id:id}, function(err, results){
		if(err) {
			res.json({
				status: 'fail',
				messages: err,
				data: null
			});
		}
		activity = results;
		async.eachSeries(results[0].mediaIds, function(item,callback){
			Media.find({_id:item}).exec(function(err,result_media){
				if(err){

				}
				mediaList.push(result_media);
				callback();
			});
		}, function(err,results){
			// activity["medias"] = mediaList;
			res.json({
				status: 'ok',
				messages: 'successed',
		 		data: activity
			})
		});
	});
}



















