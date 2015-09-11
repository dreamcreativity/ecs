var express = require('express');
var router = express.Router();
var staff =require('../controllers/staff');
var student =require('../controllers/student');
var agent =require('../controllers/agent');
var material = require('../controllers/material');
var slider =require('../controllers/slider');
var region = require('../controllers/region');
var media = require('../controllers/media');
var promotion = require('../controllers/promotion');
var course = require('../controllers/course');
var duration = require('../controllers/duration');
var activity = require('../controllers/activity');
var registration = require('../controllers/registration');
var events = require('../controllers/event');
var auth = require('../controllers/auth');
var SHA256 = require("crypto-js/sha256");
var emailSender = require('../modules/emailModule');


function IsAuthException(path, method){
	//--------------------------------------------------
	// auth exception list , put urls into this array
	//--------------------------------------------------
	var list = [
		{	path : '/api/slider', method: 'GET', type: 'direct'},
		{	path : '/api/activities', method: 'GET', type: 'direct' },
		{	path : '/api/staffs/login', method: 'POST', type: 'direct' },
		{	path : '/api/agent/login', method: 'POST', type: 'direct' },
		{	path : '/api/staffs', method: 'POST',type: 'direct' },
		{	path : '/api/activity', method: 'GET', type: 'direct' },
		{	path : '/api/pdf', method: 'POST', type: 'direct'},
		{	path : '/api/registration', method: 'GET', type: 'direct' },
		{	path : '/api/registration', method: 'POST', type: 'direct'},
		{   path : '/api/registration/sendEmail', method: 'POST', type: 'direct' },
		{	path : '/api/registration/', method: 'GET', type: 'contain'}, // Delete late
		{	path : '/api/courses/startdate/', method: 'GET', type: 'contain' }, // Delete late
		{	path : '/api/registration', method: 'POST', type: 'direct'},
		{   path : '/api/infocourses', method: 'GET', type: 'direct' },
		{	path : '/api/registration', method: 'POST', type: 'direct' },
		{	path : '/api/invitation/sendEmail', method:'POST', type:'direct'}

	];

	for(i in list){
		//console.log(list[i]);
		if(list[i].type == 'direct' && list[i].path == path &&  list[i].method == method ){
			return true;
		}

		if(list[i].type == 'contain' && path.indexOf(list[i].path) > -1  &&  list[i].method == method ){
			return true;
		}
	}
	return false;
}



function IsInActivedUserAuthException(path, method){
	//--------------------------------------------------
	// auth exception list , put urls into this array
	//--------------------------------------------------
	var list = [
		{	path : '/api/agent/resetpassword', method: 'POST' },
	];

	for(i in list){
		//console.log(list[i]);
		if(list[i].path == path &&  list[i].method == method ){
			return true;
		}
	}
	return false;
}


//-------------------------  Auth Middleware ----------------------------------
router.use(function(req,res,next){
	var path = req._parsedOriginalUrl.path;
	var method = req.method;

	if(IsAuthException(path, method)){
		next();
	}else{
		// check token from header

		if( typeof req.headers.api_token === 'undefined'){
			res.send(403,'403 auth error token');
		}else{

			console.log(req.headers.api_token);
			var accessToken = req.headers.api_token;

			auth.IsTokenValid(accessToken, function(isValid){


				if(isValid){
					console.log('pass token validation');
					next();
				}else{

					if(IsInActivedUserAuthException(path,method)){
						auth.IsTokenValidForInActivedUser(accessToken,function(isInAcvitedTokenValid){
							if (isInAcvitedTokenValid)
								next();
							else{
								res.send(403,'403 auth error');
							}
						});
					}else{
						res.send(403,'403 auth error');

					}
					
				}		
			});
		}
		
	}

});

//------------------------- Media Center ----------------------------------

router.post('/media/upload', media.upload);
router.get('/media/', media.all);
router.get('/media/:id', media.get);
router.put('/media/:id', media.edit);
router.get('/media/target/:target/type/:type', media.getCategoryTargetMedia);
router.delete('/media/:id', media.delete);
router.get('/media/target/:target', media.getByTarget);


//-------------------------Slider----------------------------------
router.post('/slider', slider.create);
router.get('/slider/:id', slider.get);
router.get('/slider', slider.all);
router.put('/slider/:id', slider.edit);
router.delete('/slider/:id', slider.delete);
//-------------------------Staff----------------------------------

router.get('/staffs/:id', staff.getStaffbyId);

router.post('/staffs/decode/:token', staff.decode);

router.post('/staffs', staff.create);

router.put('/staffs/:id', staff.edit);

router.post('/staffs/login', staff.login);

router.get('/staffs', staff.getAllStaffs);

router.delete('/staffs/:id',staff.delete);



//-------------------------Staff Account-------------------------

router.get('/staff-account/', staff.getStaffAccount);



//-----------------------Student-----------------------------------

//GET students 
router.get('/student',student.getStudents);

//GET a student by student ID
router.get('/student/studentID/:student_id', student.getStudentbyStudentId);

//GET a student by ID
router.get('/student/:id', student.getStudentbyId);

//GET students by Agent ID
router.get('/student/agent/:id',student.getStudentbyAgentId);

//POST : create a student record
router.post('/student', student.create);

//PUT : Edit a student info
router.put('/student/:id', student.edit)


//----------------------Agent----------------------------------------
//GET agents 
router.get('/agent',agent.getAgents);

//GET a agent by ID
router.get('/agent/:id', agent.getAgentbyId);

//GET a agent by ID
router.put('/agent/:id', agent.edit);

router.post('/agent', agent.create);

//GET agents by region
router.get('/agent/region/:name', agent.getAgentsbyRegion);

//POST agent login
router.post('/agent/login', agent.login);

//POST agent reset password
router.post('/agent/resetpassword', agent.resetpassword);

//-----------------------Materials ----------------------------------

//GET a material by material ID
router.get('/materials/:id', material.get);

//POST : create a material record
router.post('/materials', material.create);

//  get all material records
router.get('/materials', material.all);

//PUT : Edit a material info
router.put('/materials/:id', material.edit)

//----------------------Regions---------------------------------------

//GET : all regions
router.get('/region/', region.all);

//POST : create a region
router.post('/region', region.create);

//GET : Get a region by Id
router.get('/region/:id', region.get);

//PUT : Edit a region 
router.put('/region/:id', region.edit);

//----------------------Promotion-------------------------------------

//GET all promotions
router.get('/promotions', promotion.getAllPormotions);

//GET a promotion by promotion ID
router.get('/promotions/:id', promotion.getPromotionbyId);

//POST : create a promotion record
router.post('/promotion', promotion.create);

//------------------------Course----------------------------------------

//GET all courses
router.get('/courses', course.getAllCourses);

//POST create a new course
router.post('/courses', course.create);

//GET a course
router.get('/courses/:id', course.getCoursebyId);

//PUT edit a course
router.put('/courses/:id', course.edit);

router.get('/infocourses', course.getAllSimpleCourses);

router.get('/courses/startdate/:id/:year', course.getCourseStartDate);

//------------------------Duration----------------------------------------

// //GET all courses
// router.get('/duration', course.getAllCourses);

//POST create a new course
router.post('/duration', duration.create);

// //GET a course
// router.get('/duration/:id', course.getCoursebyId);

//PUT edit a course
router.put('/duration/:id', duration.edit);


//------------------------Course Link----------------------------------------

// //GET all courses
// router.get('/duration', course.getAllCourses);

//POST create a new course
router.post('/courseLink', course.createCourseLink);

// //GET a course
// router.get('/duration/:id', course.getCoursebyId);

//PUT edit a course
router.put('/courseLink/:id', duration.edit);


//------------------------Activity-----------------------------------------

//GET all activites
router.get('/activities', activity.getActivities);

//POST create a new activity
router.post('/activities', activity.create);

//PUT edit a activity
router.put('/activities/:id',activity.edit);

//GET a course
router.get('/activities/:id', activity.getActivitybyId);


//--------------------------Event-------------------------------------------

//GET all activites
router.get('/events', events.get);

//POST create a new activity
router.post('/events', events.create);

//PUT edit a activity
router.put('/events/:id',events.edit);

//GET a course
router.get('/events/:id', events.getEventbyId);


//-------------------------Registration--------------------------------------
router.post('/registration', registration.create);

router.get('/registration', registration.getAllRegistrations);

router.get('/registration/:id', registration.getById);



//-------------------------Email Sender--------------------------------------------

 router.post('/registration/sendEmail', registration.sendEmail);

//-------------------------Generate PDF--------------------------------------------
router.post('/pdf',registration.generatePDF);

//-------------------------Invitation Send Email-----------------------------------
router.post('/invitation/sendEmail',agent.sendInvitation);





module.exports = router;