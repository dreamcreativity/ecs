var express = require('express');
var router = express.Router();
var template = require('../modules/templateController');
var Slider = require('../models/slider');
var Media = require('../models/media');
var Course = require('../models/course');
var Staff = require('../models/staff');
var Activity = require('../models/activity');
var async = require("async");
var constants = require("../constants");



/* GET home page. */


router.get('/', function(req, res) {


	var sliders;
	var staffs;
	var courses;
	var activities;

	async.series([
		function(next){
			Staff.find({cover: { $ne: null }}).populate('cover').exec(function(err,result){
				staffs = result;
				console.log('-----------------');
				console.log(staffs);
				next();
			});
	    },
	    function(next){
			Course.find({cover: { $ne: null }}).populate('cover').exec(function(err,result){
				courses = result;
				console.log('-----------------');
				console.log(courses);
				next();
			});
	    },
	    function(next){
			Activity.find({cover: { $ne: null }, isActive: true }).populate('cover').exec(function(err,result){
				activities = result;
				console.log('-----------------');
				console.log(activities);
				next();
			});
	    },

	], function(){
		Slider.find({is_active:true}, function(err, result){
			sliders = result;

			async.each(sliders, function( slider, next) {
				slider.media = Media.findOne({_id: slider.resource}, function(err,result){
					if(err)
						throw err;
					slider.media = result; 
					next();
				});
			}, function(err){
			
				template(req,res,'client_main','client/main.html',{ 
					title: 'ESC - Englist School of Canada',
					sliders : sliders ,
					staffs: staffs,
					courses: courses,
					activities: activities,
				});		
			});
		});
	});




	
});


router.get('/activity/detail/:id', function(req, res){
	var id = req.params.id;
	var activityList = [];
	async.series([
		function(next){
			Activity.find({'isActive': true}).populate('cover').exec(function(err,result){	
				activityList = result;

				next();
			});
	    },

	], function(){
		console.log(activityList);
		Activity.find({'_id':id}).populate('album').populate('cover').exec(function(err,result){
			template(req,res,'client_normal','client/activityDetail.html',{ 
				activity : result[0],
				activityList : activityList,
			});
		});
	});

});


router.get('/activity', function(req, res){

	Activity.find({}).populate('cover').exec(function(err,result){
		template(req,res,'client_normal','client/activity.html',{ 
			activitys : result
		});
	});

});


router.get('/calculator', function(req, res){
	var constants = require("../constants")
	var CourseModule = require('../modules/publicHolidayModule');

	template(req,res,'client_normal','client/calculator.html',{});
});



router.get('/course/:id', function(req, res){
	

	var id = req.params.id;

	Course.find({_id:id, isActive:true })
					.populate('links')
					.populate('banner')
					.populate('cover')
					.exec(function(err, result){
		if(err){
			console.log(err);
			res.redirect('/');
		}
			


		console.log(result);
		template(req,res,'client_normal','client/course.html',{'course' :  result[0]});	
	});
	
});





router.get('/events', function(req, res){



	Activity.find(function(err,result){

		// find media
		Media.find({'_id':{$in:result[0].mediaIds}} , function(er, imgs){
			console.log(imgs);
			template(req,res,'client_normal','client/event.html',{ a : result[0], images:imgs});
		});
		
	});

});


router.get('/calendar', function(req, res){

	template(req,res,'client_normal','client/calendar.html',{});
	

	//template(req,res,'client_normal','client/activity.html',{});
});

router.get('/register/', function(req,res){
	template(req,res, 'client_normal', 'client/register.html', {url_params : null});
})

router.get('/register/:token', function(req,res){
	template(req,res, 'client_normal', 'client/register.html', {url_params : req.params});
});





router.get('/login', function(req, res) {
	template(req,res,'client_main','client/login.html',{ });
});




module.exports = router;

