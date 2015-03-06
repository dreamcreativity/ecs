var express = require('express');
var router = express.Router();
var template = require('../modules/templateController');
var Slider = require('../models/slider');
var Media = require('../models/media');
var async = require("async");


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

router.get('/login', function(req, res) {
	template(req,res,'client_main','client/login.html',{ });
});




module.exports = router;

