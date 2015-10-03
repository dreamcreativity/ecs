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

	Activity.find({_id:id}).populate('cover').populate('album').exec(function(err, results){
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
		// activity = results;
		// async.eachSeries(results[0].mediaIds, function(item,callback){
		// 	Media.find({_id:item}).exec(function(err,result_media){
		// 		if(err){

		// 		}
		// 		mediaList.push(result_media[0]);
		// 		callback();
		// 	});
		// }, function(err,result2){
		//     activity[0].medias = mediaList;
		// 	res.json({
		// 		status: 'ok',
		// 		messages: 'successed',
		//  		data: activity[0]
		// 	})
		// });
	});
}

//PUT : Activity 
exports.edit = function(req,res){
	var id = req.params.id;

	console.log(req.body);
	//var staff = new Staff(req.body);
	async.series([
	    function(next){ 
	    	if(req.body.cover != null)
	    		req.body.cover = req.body.cover._id;


			for (var i = 0; i < req.body.album.length; i++) {
				req.body.album[i] = req.body.album[i]._id;

			};
			next();

	    }
	], function(){
		console.log(req.body.album);
		Activity.update({_id:id}, req.body, function(err, result){
			if(err){
				res.json({
					status: 'fail',
					messages: err,
					data: null
				});
			}
			else {
				if(result == 1){
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

	});

}


















