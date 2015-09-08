var Course = require('../models/course');
var Duration = require('../models/duration');
var CourseLink = require('../models/courseLink');
var publicHolidayModule = require('../modules/publicHolidayModule');
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

exports.getCourseStartDate = function (req,res){

	var course_id = req.params.id;
	var targetYear = parseInt(req.params.year);

	console.log(course_id);
	console.log(targetYear);
	Course.find({_id:course_id, isActive:true }).populate({path: 'durations', options: { sort: { 'order': +1 } } }).exec(function(err, result){
		if(err) {
			res.json({
				status: 'fail',
				messages: err,
				data: null
			});
		}
		else{

			if(result.length != 1){
				res.json({
					status: 'fail',
					messages: 'duplicated record',
					data: null
				});
			}else{

				course = result[0];
				var startDateList = [];
				var today = new Date();
				var year = today.getFullYear();
				var month = today.getMonth();
				var day = today.getDate();
				console.log(year+'-'+month+'-'+day);

				if(course.durations.length > 0 || targetYear < year || targetYear > year+5 ){
					
					// get public holiday list for the target year
					var publicHolidayList = publicHolidayModule.getPublicHolidayList(targetYear);
					var nextYear = new Date(targetYear+1,0,1);

					if( course.type == 'Fixed Period' ){
						var duration = course.durations[0];
						var durationWeek = duration.week;
						var startPoint = course.startPoint;
						
						var startCalculateDate = null;
						

						if( targetYear == year ){
							startCalculateDate = new Date(today.valueOf());
						}else{
							startCalculateDate = new Date(2016,0,1);
						}

						// loop from start point to today
						while(true){
							// add week for start date
							startPoint.setDate(startPoint.getDate()+ 7*durationWeek);
							if( startPoint > startCalculateDate)
								break;
						}	
						// add date into date list
						while(true){
							if(startPoint > nextYear)
								break;
							var newStartDateItem = new Date(startPoint.valueOf());
							
							if( !publicHolidayModule.isPublicHoliday(publicHolidayList, newStartDateItem))
								newStartDateItem.setDate(newStartDateItem.getDate()-1);
							startDateList.push(new Date(newStartDateItem));
							startPoint.setDate(startPoint.getDate()+ 7*durationWeek);
						}

						console.log('sss');
					}else{

						var newStartDate = new Date(today.valueOf());
						console.log(today);
						console.log(newStartDate);

						var startCalculateDate = null;
						if( targetYear == year ){
							startCalculateDate = new Date(today.valueOf());
						}else{
							startCalculateDate = new Date(2016,0,1);
						}

						// loop from start point to today
						while(true){
							console.log(newStartDate.getDay());
							if( newStartDate.getDay() == 1 && newStartDate > startCalculateDate)
								break;

							// add week for start date
							newStartDate.setDate(newStartDate.getDate()+ 1 );
							
						}	

						// add date into date list
						while(true){

							if(newStartDate > nextYear)
								break;
							var newStartDateItem = new Date(newStartDate.valueOf());

							while( publicHolidayModule.isPublicHoliday(publicHolidayList, newStartDateItem))
								newStartDateItem.setDate(newStartDateItem.getDate()+1);

							startDateList.push(newStartDateItem);
							newStartDate.setDate(newStartDate.getDate()+ 7);
							console.log(newStartDate);

							
						}
						
					}

				}

				res.json({
					status: 'ok',
					messages: 'successed',
					data: startDateList
				});



				// async.each(result, function(val, callback) {
				// 	if(val.type == 'Fixed Period' ){
				// 		val.durations = [ val.durations[0] ];
				// 	}
					
				// 	callback();
				// }, function(err){

				// 	res.json({
				// 		status: 'ok',
				// 		messages: 'successed',
				// 		data: startDateList
				// 	});
				// });
			}




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



















