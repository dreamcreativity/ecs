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
var activity = require('../controllers/activity');
var auth = require('../controllers/auth');
var SHA256 = require("crypto-js/sha256");
var emailSender = require('../modules/emailsenderController');


function IsAuthException(path, method){
	//--------------------------------------------------
	// auth exception list , put urls into this array
	//--------------------------------------------------
	var list = [
		{	path : '/api/slider', method: 'GET' },
		{	path : '/api/activities', method: 'GET' },
		{	path : '/api/staffs/login', method: 'POST' },
		{	path : '/api/staffs', method: 'POST' },

	];

	for(i in list){
		//console.log(list[i]);
		if(list[i].path == path &&  list[i].method == method ){
			return true;
		}
	}
	return false;
}


function IsTokenValid(token){
	return auth.IsTokenValid(token);
}

//-------------------------  Auth Middleware ----------------------------------
router.use(function(req,res,next){
	//console.log('---------------------------');
	//console.log(req.method);
	
	var path = req._parsedOriginalUrl.path;
	var method = req.method;
	//console.log(path);

	if(IsAuthException(path, method)){
		next();
	}else{
		// check token from header

		if( typeof req.headers.api_token === 'undefined')
			res.send(403,'403 auth error token');
		else{
			console.log(req.headers.api_token);
			var accessToken = req.headers.api_token;

			auth.IsTokenValid(accessToken, function(isValid){

				if(isValid){
					console.log('pass token validation');
					next();
				}else{
					res.send(403,'403 auth error');
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
router.get('/agent/region/:name', agent.getAgentsbyRegion)

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

//------------------------Activity-----------------------------------------

//GET all activites
router.get('/activities', activity.getActivities);

//POST create a new activity
router.post('/activities', activity.create);

//PUT edit a activity
router.put('/activities/:id',activity.edit);

//GET a course
router.get('/activities/:id', activity.getActivitybyId);


//-------------------------Email Sender--------------------------------------------

router.post('/postEmail', emailSender.sendEmail);





module.exports = router;