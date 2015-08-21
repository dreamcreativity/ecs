var express = require('express');
var router = express.Router();
var template = require('../modules/templateController');
var Slider = require('../models/slider');
var Media = require('../models/media');
var async = require("async");
var constants = require("../constants");




router.get('/test', function(req, res) {
	var Duration = require('../models/duration');
	var Course = require('../models/course');

	var dList  = [];

	async.series([
	    function(next){
	    	Duration.find({}, function(err, users) {
	    		dList = users;
	    		next();

	    	});

	    },
	    function(next){

	    	Course.find().populate('durations').exec(function(err, c) {
			    if (err) { console.log(err); }

			    c[0].durations[0].price = Math.random();


			    c[0].save(function(e,r){

			    	 console.log(c);
			    		next();
			    });
			   
			});

	    	
	    }
	], function(){
		template(req,res,'client_main','client/test.html',{ 
							title: 'ESC - Englist School of Canada',
							dList : dList
						});	


	});
	
	

});


router.post('/addDuration', function(req, res) {


	var Duration = require('../models/duration');
	var newDuration = new Duration(req.body);

	newDuration.save(function(err, result){

		if(err)
			console.log(err);
		
		res.writeHead(301,
		  {Location: '/test'}
		);
		res.end();
	});


});


router.post('/addCourse', function(req, res) {

	var Duration = require('../models/duration');
	var Course = require('../models/course');

	console.log(req.body)
	var newCourse = new Course(req.body);
	
	newCourse.save(function(err, result){
		if(err)
			console.log(err);
		
		res.writeHead(301,
		  {Location: '/test'}
		);
		res.end();
	});

});



/* GET home page. */


router.get('/', function(req, res) {
	var sliders;
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
			console.log(sliders);
			template(req,res,'client_main','client/main.html',{ 
				title: 'ESC - Englist School of Canada',
				sliders : sliders 
			});		
		});
	});
});


router.get('/program', function(req, res){


	template(req,res,'client_normal','client/program.html',{ });

	//template(req,res,'client_normal','client/activity.html',{});
});

router.get('/activity', function(req, res){


	var Activity = require('../models/activity');

	Activity.find(function(err,result){


		console.log(result[0]);

		// find media
		Media.find({'_id':{$in:result[0].mediaIds}} , function(er, imgs){
			console.log(imgs);
			template(req,res,'client_normal','client/activity.html',{ a : result[0], images:imgs});
		});
		
	});

	//template(req,res,'client_normal','client/activity.html',{});
});


router.get('/events', function(req, res){


	var Activity = require('../models/activity');

	Activity.find(function(err,result){


		console.log(result[0]);

		// find media
		Media.find({'_id':{$in:result[0].mediaIds}} , function(er, imgs){
			console.log(imgs);
			template(req,res,'client_normal','client/event.html',{ a : result[0], images:imgs});
		});
		
	});

	//template(req,res,'client_normal','client/activity.html',{});
});

router.get('/login', function(req, res) {
	template(req,res,'client_main','client/login.html',{ });
});




module.exports = router;

