var express = require('express');
var router = express.Router();
var template = require('../modules/templateController');
var Slider = require('../models/slider');
var Media = require('../models/media');
var Course = require('../models/course');
var Staff = require('../models/staff');
var Activity = require('../models/activity');
var Event = require('../models/event');
var StaticEvent = require('../models/staticEvent');
var StatiMedia = require('../models/staticMedia');
var async = require("async");
var constants = require("../constants");
var random = require('mongoose-random');


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
				next();
			});
	    },
	    function(next){
			Course.find({cover: { $ne: null }, isActive: true, isDelete: false}).sort({order: 1}).populate('cover').exec(function(err,result){
				courses = result;
				next();
			});
	    },
	    function(next){
			Activity.find({cover: { $ne: null }, isActive: true }).populate('cover').sort({'displayOrder': -1}).limit(9).exec(function(err,result){
				activities = result;
				next();
			});
	    },
	    function(next){
			Slider.find({ resource: { $ne: null }, is_active: true }).populate('resource').sort({'order': 1}).exec(function(err,result){
				console.log(result);
				sliders = result;
				next();
			});
	    },

	], function(){
		// Slider.find({is_active:true}, function(err, result){
		// 	sliders = result;

		// 	async.each(sliders, function( slider, next) {
		// 		slider.media = Media.findOne({_id: slider.resource}, function(err,result){
		// 			if(err)
		// 				throw err;
		// 			slider.media = result; 
		// 			next();
		// 		});
		// 	}, function(err){
			
		// 		template(req,res,'client_main','client/main.html',{ 
		// 			title: 'ESC - Englist School of Canada',
		// 			sliders : sliders ,
		// 			staffs: staffs,
		// 			courses: courses,
		// 			activities: activities,
		// 		});		
		// 	});
		// });

		template(req,res,'client_main','client/main.html',{ 
			title: 'ESC - English School of Canada',
			sliders : sliders ,
			staffs: staffs,
			courses: courses,
			activities: activities,
		});	


	});




	
});



router.get('/online', function(req, res) {
    // Process the data received in req.body
    res.redirect('/');
});

router.get('/gallery/detail/:id', function(req, res){
	var id = req.params.id;
	var activityList = [];
	async.series([
		function(next){
			Activity.find({'isActive': true, _id: { $ne: id } }).populate('cover').sort({'displayOrder': -1}).limit(8).exec(function(err,result){	
				activityList = result;

				next();
			});
	    },

	], function(){
		console.log(activityList);
		Activity.find({'_id':id}).populate('album').populate('cover').exec(function(err,result){
			template(req,res,'client_normal','client/galleryDetail.html',{ 
				activity : result[0],
				activityList : activityList,
			});
		});
	});

});


router.get('/gallery', function(req, res){


	Activity.find({'isActive': true}).populate('cover').sort({'displayOrder': -1}).limit(9).exec(function(err,result){
		template(req,res,'client_normal','client/gallery.html',{ 
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

	Course.findOne({_id:id})
					.populate('links')
					.populate('banner')
					.populate('cover')
					.exec(function(err, result){
		if(err){
			console.log(err);
			res.redirect('/');
		}
			console.log(result);

		if(result.isActive == false ){
			res.redirect('/');
		}else{
			template(req,res,'client_normal','client/course.html',{'course' :  result});	
		}
			



		//console.log(result);
		
	});
	
});



router.get('/event/:id', function(req, res){
	var moment = require('moment');
	var id = req.params.id;

	Event.find({_id:id}).populate('cover').exec(function(err, result){
		var eventInfo = result[0];

		var startDate = moment(eventInfo.date).format('MMM Do YYYY');
		var startTime = moment(eventInfo.date).format('h : mm : ss a');

	

		template(req,res,'client_normal','client/eventDetail.html',{
			title: 'Event Detail',
			event: eventInfo,
			startDate: startDate,
			startTime: startTime
		});

	});
	
});


router.get('/welcome', function(req, res){

	template(req,res,'client_normal','client/welcome.html',{});

});

router.get('/onlineTest', function(req, res){

	template(req,res,'client_normal','client/onlineTest.html',{});

});

router.get('/events', function(req, res){


	StaticEvent.findOne({_id:'574b25acc9ae5f3b22f53b85'}).populate('media').exec(function(err, result){
		
		var staticEventInfo = result;

		template(req,res,'client_normal','client/event.html',{

			StaticEventInfo : result
		});

	});

	//template(req,res,'client_normal','client/event.html',{});

});


router.get('/classChart', function(req, res){
	template(req,res,'client_normal','client/class-chart.html',{});
});
router.get('/preArrival', function(req, res){
	template(req,res,'client_normal','client/pre-arrival.html',{});
});
router.get('/accommodation', function(req, res){
	template(req,res,'client_normal','client/accommodation.html',{});
});



router.get('/team', function(req, res){

	Staff.find({cover: { $ne: null }}).populate('cover').sort('-rank').exec(function(err,result){
	
		template(req,res,'client_normal','client/team.html',{
			staffs : result
		});
	});


});

router.get('/city', function(req, res){
	template(req,res,'client_normal','client/city.html',{});
});

router.get('/city/high-park', function(req, res){
	template(req,res,'client_normal','client/city/high-park.html',{});
});
router.get('/city/casa-loma', function(req, res){
	template(req,res,'client_normal','client/city/casa-loma.html',{});
});
router.get('/city/wonderland', function(req, res){
	template(req,res,'client_normal','client/city/wonderland.html',{});
});

router.get('/city/rom', function(req, res){
	template(req,res,'client_normal','client/city/rom.html',{});
});
router.get('/city/toronto-island', function(req, res){
	template(req,res,'client_normal','client/city/toronto-island.html',{});
});
router.get('/city/cn-tower', function(req, res){
	template(req,res,'client_normal','client/city/cn-tower.html',{});
});

router.get('/why-esc', function(req, res){

	template(req,res,'client_normal','client/why.html',{});

});

router.get('/philosophy', function(req, res){

	template(req,res,'client_normal','client/philosophy.html',{});

});


router.get('/procedures', function(req, res){

	template(req,res,'client_normal','client/procedures.html',{});

});

router.get('/guidelines', function(req, res){
	template(req,res,'client_normal','client/guidelines.html',{});
});

router.get('/junior-programs', function(req, res){
	template(req,res,'client_normal','client/junior-programs.html',{});
});

router.get('/campus-pictures', function(req, res){
	template(req,res,'client_normal','client/campus-pictures.html',{});
});


router.get('/qa', function(req, res){
	template(req,res,'client_normal','client/qa.html',{});
});



router.get('/calendar', function(req, res){

	var CurrentAcademyCalendar = null;
	var FutureAcademyCalendar = null;

	async.series([
		function(next){


			var calendarId = constants.StaticMediaId.CurrentAcademyCalendar;

			StatiMedia.findOne({_id:calendarId}).populate('media').exec(function(err, result){
				CurrentAcademyCalendar = result;
				next();
			});

	    },
	    function(next){
	    	var futureCalendarId = constants.StaticMediaId.FutureAcademyCalendar;
	    	StatiMedia.findOne({_id:futureCalendarId}).populate('media').exec(function(err, result){
				FutureAcademyCalendar = result;
				next();
			});
	    }
	    

	], function(){

		Course.find({isShowInCalendar: true}, function(err,result){
			template(req,res,'client_normal','client/calendar.html',{ 
				CurrentAcademyCalendar: CurrentAcademyCalendar, 
				FutureAcademyCalendar: FutureAcademyCalendar, 
				courses: result
			} );
		});

	});


});


router.get('/partner/', function(req,res){
	template(req,res, 'client_normal', 'client/partner.html', {url_params : null});
})

router.get('/partner/:id', function(req,res){
	template(req,res, 'client_normal', 'client/partner-detail.html', {url_params : req.params});
})



router.get('/register/', function(req,res){
	template(req,res, 'client_normal', 'client/register.html', {url_params : null});
})

router.get('/register/:token', function(req,res){
	template(req,res, 'client_normal', 'client/register.html', {url_params : req.params});
});


router.get('/page/:page_name', function(req, res) {
	var pageName = req.params.page_name;
	pageName = pageName.replace('-','_');
	template(req,res,'client_normal','client/static/'+ pageName + '.html' ,{ 
		title: pageName
	});
});



router.get('/login', function(req, res) {
	template(req,res,'client_main','client/login.html',{ });
});

router.get('/junior-programs/create', function(req, res){
	template(req,res,'client_normal','client/junior-programs-create.html',{});
});

router.get('/payment', function(req, res){
	template(req,res,'client_normal','client/payment.html',{});
});

router.get('/hc', function(req, res){
	template(req,res,'client_normal','client/health-care.html',{});
});


module.exports = router;

