var Course = require('../models/course');
var Duration = require('../models/duration');
var CourseLink = require('../models/courseLink');
var mongoose = require('mongoose');
var async = require("async");


//POST: create new Course
exports.create = function(req,res){
	req.body.lastModify = Date.now();
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


exports.getAllSimpleCourses = function (req,res){
// res.json({
// 	status: 'ok',
// 	messages: 'successed',
// 	data: null
// });

	Course.find({ isActive:true }).populate({path: 'durations', options: { sort: { 'order': +1 } } }).exec(function(err, result){
		if(err) {
			res.json({
				status: 'fail',
				messages: err,
				data: null
			});
		}
		else{


			async.each(result, function(val, callback) {
				if(val.type == 'Fixed Period' ){
					val.durations = [ val.durations[0] ];
				}
				
				callback();
			}, function(err){

				res.json({
					status: 'ok',
					messages: 'successed',
					data: result
				});
			});


		}
	});

}


//GET: course by Id
exports.getCoursebyId = function(req,res){
	var id = req.params.id;
	Course.find({_id:id}).populate('durations').populate('links').populate('banner').populate('cover').exec(function(err, result){
		if(err) {
			res.json({
				status: 'fail',
				messages: err,
				data: null
			});
		}
		else if(result.length == 1){
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
	var linkIds = [];
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
		 // save each course link object in the list
		function(next){
			async.each(req.body.links, function( val, callback) {
				CourseLink.update({_id:val._id}, val, function(err,result){
					callback();
					});
				}, function(err){
					next();

				});
		 },
		// convert ref ids
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
	    			//convert course link object list to object_id list
	    			function(converIdNext){
				    	async.each(req.body.links, function( val, callback) {
							linkIds.push(val._id);
							callback();
						}, function(err){
							req.body.links = linkIds;
							console.log('----- check body ----');
							console.log(req.body.links);
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
	    // clear non-used course link objects
	    function(next){
	    	//Duration.where('course', req.body._id).nor(durationIds)
	    	CourseLink.remove({course:id, _id: { $nin: linkIds }}, function(err){
	    		next();
	    	})
	    	
	    },
	    // verify couse status, and reset value if nessucces
	    function(next){
	    	
	    	if(req.body.durations.length == 0)
	    		req.body.isActive = false;

	    	next();
	    	
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
			}else{

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


//POST: create new Course link
exports.createCourseLink = function(req,res){
	var newCourseLink = new CourseLink(req.body);
	newCourseLink.save(function(err ,result){
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


//PUT: 
exports.editCourseLink = function(req,res){
	var id = req.params.id;
	req.body.lastModify = Date.now();
	//console.log(req.body);

	res.json({
		status: 'fail',
		messages: "multipulte result",
		data: null
	});
	

} 



















