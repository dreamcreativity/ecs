var express = require('express');
var router = express.Router();
var template = require('../modules/templateController');
var Slider = require('../models/slider');
var Media = require('../models/media');
var async = require("async");
var constants = require("../constants");



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


router.get('/login', function(req, res) {
	template(req,res,'client_main','client/login.html',{ });
});




module.exports = router;

