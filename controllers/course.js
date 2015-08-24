var Course = require('../models/course');
var Duration = require('../models/duration');
var mongoose = require('mongoose');
var async = require("async");


//POST: create new Course
exports.create = function(req,res){
	var newCourse = new Course(req.body);
	newCourse.save(function(err ,result){
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


//GET: all courses
exports.getAllCourses = function (req,res){
	console.log('fdsafdsa fdsafdsa fdsaf');
	Course.find({},function(err,results){
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

//GET: course by Id
exports.getCoursebyId = function(req,res){
	console.log('getCoursebyId');
	var id = req.params.id;
	Course.find({_id:id}).populate('durations').populate('banner').populate('cover').exec(function(err, result){

		
		if(err) {
			res.json({
				status: 'fail',
				messages: err,
				data: null
			});
		}
		else if(result.length == 1){

			console.log("--------------------");
			console.log(result[0]);

			res.json({
				status: 'ok',
				messages: 'successed',
				data: result[0]
			});
		}
	});
}

//PUT: 
exports.edit = function(req,res){
	var id = req.params.id;
	req.body.lastModify = Date.now();
	//console.log(req.body);

	var durationIds = [];
	async.series([
		// save each duration object in the list
		function(next){

			async.each(req.body.durations, function( val, callback) {
				Duration.update({_id:val._id}, val, function(err,result){
					callback();
					});
				}, function(err){
					next();

				});
		 },
		// convert duration object list to object_id list
	    function(next){
	    	console.log(req.body.banner );
	    	async.series([

	    			//convert banner object to id
	    			function(converIdNext){
	    				if (req.body.banner == null) {
	    					converIdNext();
	    				}else{
	    					req.body.banner = req.body.banner._id;
	    					converIdNext();
	    				}
	    			},
	    			//convert cover meida object to id
	    			function(converIdNext){
	    				if (req.body.cover == null) {
	    					converIdNext();
	    				}else{
	    					req.body.cover = req.body.cover._id;
	    					converIdNext();
	    				}
	    			},
	    			//convert duration object list to object_id list
	    			function(converIdNext){
				    	async.each(req.body.durations, function( val, callback) {
							durationIds.push(val._id);
							callback();
						}, function(err){
							req.body.durations = durationIds;
							converIdNext();
						});
	    			},
	    		],
	    		function(){
	    			next();
	    		}

	    	);


	    },
	    // clear non-used duration objects
	    function(next){
	    	//Duration.where('course', req.body._id).nor(durationIds)
	    	Duration.remove({course:id, _id: { $nin: durationIds }}, function(err){
	    		next();
	    	})
	    	
	    },
	], function(){
		// update
		Course.update({_id:id}, req.body, function(err, result){
			if(err){
				res.json({
					status: 'fail',
					messages: err,
					data: null
				});
			}

		else {

				console.log('---------- update course reuslt -----------');
				console.log(result[0]);
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

//DELETE : Set Course isDelete be true
exports.delete = function(req,res){
	var id = req.params.id;
	Course.find({_id:id}, function(err,result){
		if(err){
			res.json({
				status:'fail',
				messages: err, 
				data:null
			});
		}
		else {
			result[0]["isDelete"] =true;
			Course.update({_id:id}, result[0], function(err,result){
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

