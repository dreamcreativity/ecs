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
var events = require('../controllers/event');
var staticMedia = require('../controllers/staticMedia');
var onlineTest = require('../controllers/onlineTest');
var payment = require('../controllers/payment');
var partner = require('../controllers/partner');
var searchRecord = require('../controllers/searchRecord');
var sticker = require('../controllers/sticker');
var commission = require('../controllers/commission');
var constants = require('../controllers/constants');
var auth = require('../controllers/auth');
var SHA256 = require("crypto-js/sha256");
var emailSender = require('../modules/emailModule');
var pdf = require('../modules/pdfModule');
var juniorprogram = require('../controllers/juniorprogram');


http://localhost:2000/api/events-static 


function IsAuthException(path, method){
	//--------------------------------------------------
	// auth exception list , put urls into this array
	//--------------------------------------------------
	var list = [
		{	path : '/api/events', method: 'GET', type: 'direct'},
		{	path : '/api/events-static', method: 'GET', type: 'direct'},
		{	path : '/api/slider', method: 'GET', type: 'direct'},
		{	path : '/api/activities', method: 'GET', type: 'direct' },
		{	path : '/api/staff/login', method: 'POST', type: 'direct' },
		{	path : '/api/agent/login', method: 'POST', type: 'direct' },
		{	path : '/api/staffs', method: 'POST',type: 'direct' },
		{	path : '/api/activity', method: 'GET', type: 'direct' },
		{	path : '/api/pdf', method: 'POST', type: 'direct'},
		// {	path : '/api/constants', method: 'GET', type: 'contain'},
		{	path : '/api/courses', method: 'GET', type: 'direct' }, 
		{	path : '/api/courses-calendar', method: 'GET', type: 'direct' }, 
		{	path : '/api/courses/startdate/', method: 'GET', type: 'contain' }, 
		{   path : '/api/infocourses', method: 'GET', type: 'direct' },
		{   path : '/api/menucourses', method: 'GET', type: 'direct' },
		{	path : '/api/invitation/sendEmail', method:'POST', type:'direct'},
		{	path : '/api/student/register', method:'POST', type:'direct'},
		{	path : '/api/student/register', method:'POST', type:'direct'},
		{	path : '/api/registration/sendEmail', method:'POST', type:'direct'},
		{	path : '/api/juniorprogram/create', method:'POST', type:'direct'},
		{	path : '/api/juniorprograms/sendEmail', method:'POST', type:'direct'},
		{	path : '/api/client/sendEmail', method:'POST', type:'direct'},
		{	path : '/api/agent/token/56219b80aeb7ca651025961a', method:'POST', type:'contain'},
		{	path : '/api/constants/Country', method:'GET', type:'contain'},
		{	path : '/api/constants/SummerProgramTorontoStartDate', method:'GET', type:'contain'},
		{	path : '/api/constants/SummerProgramTorontoDuration', method:'GET', type:'contain'},
		{	path : '/api/constants/SummerProgramKingstonStartDate', method:'GET', type:'contain'},
		{	path : '/api/constants/SummerProgramKingstonDuration', method:'GET', type:'contain'},
		{	path : '/api/onlineTest/getTestQuestions', method:'GET', type:'direct'},
		{	path : '/api/onlineTest/getNewTestRecord', method:'GET', type:'direct'},
		{	path : '/api/onlineTest/submitTestRecord', method:'POST', type:'direct'},
		{	path : '/api/onlineTest/sendEmail', method:'POST', type:'direct'},
		{	path : '/api/static-media/CurrentAcademyCalendar', method:'GET', type:'direct'},
		{	path : '/api/static-media/FutureAcademyCalendar', method:'GET', type:'direct'},
		{	path : '/api/static-media/ActivityCalendar', method:'GET', type:'direct'},
		{	path : '/api/partner', method:'GET', type:'contain'},
		{	path : '/partner/addSearchRecord/', method:'POST', type:'contain'},
		{	path : '/api/partner-getKeyList/', method:'GET', type:'direct'}

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

		if( typeof req.headers.authorization === 'undefined'){
			res.send(403,'403 auth error token');
		}else{

			console.log(req.headers.authorization);
			var accessToken = req.headers.authorization;
			var accessReferer = req.headers.referer;

			auth.IsTokenValid(accessToken, accessReferer, function(isValid){


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
router.post('/media/deleteMedias', media.deleteMedias);
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

router.post('/staffs/resetpassword/:id', staff.updatePassword);

router.post('/staff/login', staff.login);

router.get('/staffs', staff.getAllStaffs);

router.post('/staffs/register/sendEmail', staff.sendEmailForRegister);

router.delete('/staffs/:id',staff.delete);



//-------------------------Staff Account-------------------------

router.get('/staff-account/', staff.getStaffAccount);
router.post('/staffs/changepassword', staff.changePassword);


//-----------------------Student-----------------------------------

//GET students 
router.get('/student',student.getStudents);

//GET a student by student ID
router.get('/student/studentID/:student_id', student.getStudentbyStudentId);

//GET a student by ID
router.get('/student/:id', student.getStudentbyId);

//GET students by Agent ID
router.get('/student/agent/:id',student.getStudentbyAgentId);

//GET registration by Id 
router.get('/registration/top', student.getRegistrations);

//GET registration by Id 
router.get('/registration/:id', student.getRegistrationById);

//PUT registration by Id
router.put('/registration/:id', student.updateRegistration);

//GET students registration by Agent ID
router.get('/registration/agent/:id',student.getRegistrationByAgent);

//GET students registration by Student ID
router.get('/registration/student/:id', student.getRegistrationByStudent);

//POST : create a student record
router.post('/student', student.create);

//POST : create a student record
router.post('/student/register', student.register);

//POST : create a accommodation
router.post('/accommodation', student.createAccommodation);

//POST : create a flightInfo
router.post('/flightInfo', student.createFlightInfo);

//POST students by Agent ID
router.post('/student/extending',student.createExtendingCourse);

//PUT : Edit a student info
router.put('/student/:id', student.edit);

//PUT : Edit a student info by Agent
router.put('/student/agent/:id', student.editByAgent);

//PUT : Update Accomdation info
router.put('/student/accommodation/:id', student.updateAccommdation);

//PUT : Update Flight info
router.put('/student/flightInfo/:id', student.updateFlightInfo);

//GET : ProgramRegister
router.get('/student/programregister/:id',student.getProgramRegister);

//POST : ProgramRegister
router.post('/student/programregister/:id', student.updateProgramRegister);


//---------------------- Commissions ---------------------------------------
router.post('/commission/byAgentId', commission.getCommissionByAgentId);


//----------------------Payment---------------------------------------
//POST : Add new payment to registration
router.post('/student/payment', payment.create);

//POST : Update payment info
router.put('/student/payment/:id', payment.edit);

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

//POST agent reset password in profile
router.post('/agent/resetpasswordInProfile', agent.resetpasswordInProfile);

//GET current agent by token
router.post('/agent/token/:token', agent.getAgentbyToken);

//POST send email notification to Agent when create a new agent
router.post('/agent/register/sendEmail', agent.sendEmailForRegister);

//-----------------------Materials ----------------------------------

//GET a material by material ID
router.get('/materials/:id', material.get);

//POST : create a material record
router.post('/materials', material.create);

//  get all material records
router.get('/materials', material.all);

//PUT : Edit a material info
router.put('/materials/:id', material.edit)

//GET : Get materials by agent id
router.get('/materials/agent/:id', material.getByAgentId);

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

//PUT Edit promotion
router.put('/promotions/:id', promotion.edit);

router.get('/promotions/region/:region', promotion.getPromotionbyRegion);

//POST : create a promotion record
router.post('/promotions', promotion.create);

//------------------------Course----------------------------------------

//GET all courses
router.get('/courses', course.getAllCourses);

//POST create a new course
router.post('/courses', course.create);

//GET a course
router.get('/courses/:id', course.getCoursebyId);

//PUT edit a course
router.put('/courses/:id', course.edit);

router.get('/menucourses', course.getMenuCourses);

router.get('/infocourses', course.getAllSimpleCourses);

router.get('/courses-calendar', course.getCalendarCourses);

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

router.get('/events-static', events.getEventStatic);
router.put('/events-static', events.updateEventStatic);


router.get('/calendar-static', events.getCalendarStatic);
router.put('/calendar-static', events.updateCalendarStatic);

//-------------------------- Static Media ----------------------------------------

router.get('/static-media/CurrentAcademyCalendar', staticMedia.getCurrentAcademyCalendar);
router.put('/static-media/CurrentAcademyCalendar', staticMedia.updateCurrentAcademyCalendar);
router.get('/static-media/FutureAcademyCalendar', staticMedia.getFutureAcademyCalendar);
router.put('/static-media/FutureAcademyCalendar', staticMedia.updateFutureAcademyCalendar);


router.get('/static-media/ActivityCalendar', staticMedia.getActivityCalendar);
router.put('/static-media/ActivityCalendar', staticMedia.updateActivityCalendar);

//--------------------------Online Test-------------------------------------------
//GET all empty online test question record
router.get('/onlineTest/getNew', onlineTest.getNew);
router.get('/onlineTest/getAll', onlineTest.getAll);
router.get('/onlineTest/get/:id', onlineTest.get);
router.put('/onlineTest/save/:id', onlineTest.save);
router.post('/onlineTest/create', onlineTest.create);

router.get('/onlineTest/getTestQuestions', onlineTest.getTestQuestions);


router.get('/onlineTest/getNewTestRecord', onlineTest.getNewRecord);
router.post('/onlineTest/submitTestRecord', onlineTest.createTestRecord);


router.get('/onlineTest/records', onlineTest.getAllRecords);
router.post('/onlineTest/getAllRecordsByFilter', onlineTest.getAllRecordsByFilters);
router.get('/onlineTest/record/:id', onlineTest.getRecord);

router.post('/onlineTest/sendEmail',onlineTest.sendEmail);

//-------------------------- Constants ---------------------------------------
 router.get('/constants/:name', constants.get);


//-------------------------Email Sender--------------------------------------------

 router.post('/registration/sendEmail', student.sendEmail);

//-------------------------Generate PDF--------------------------------------------
router.post('/pdf',student.generatePDF);
//-------------------------Download PDF
router.get('/pdf/Download_01',pdf.downloadPDF01);

router.get('/pdf/Download_02',pdf.downloadPDF02);
router.get('/pdf/Download_03',pdf.downloadPDF03);
//-------------------------Invitation Send Email-----------------------------------
router.post('/invitation/sendEmail',agent.sendInvitation);

router.post('/agent/resetpassword/sendEmail', agent.sendNotificationForResetPassword);
router.post('/staff/resetpassword/sendEmail', staff.sendNotificationForResetPassword);

//------------------------Send Email in client site--------------------------------
router.post('/client/sendEmail', student.client_sendEmail);


//------------------------Junior Program ---------------------------------------
router.post('/juniorprogram/create', juniorprogram.create);

//GET students 
router.get('/juniorprograms',juniorprogram.getStudents);

//GET a student by ID
router.get('/juniorprograms/:id', juniorprogram.getStudentbyId);

//PUT : Edit a student info
router.put('/juniorprograms/:id', juniorprogram.edit);

//Send Email 
router.post('/juniorprograms/sendEmail', juniorprogram.sendEmail);


//------------------------ Partner Add-on ---------------------------------------
router.get('/partner/', partner.getAll);
router.get('/partner/:id', partner.get);
router.post('/partner/create', partner.create);
router.put('/partner/:id', partner.update);
router.get('/partner-getKeyList', partner.getKeyList);
router.post('/partner/addSearchRecord/:key', searchRecord.addRecord);
router.get('/partner-getSearchRecord', searchRecord.getRecords);

router.get('/partner/area/:id', partner.getArea);
router.get('/partner-arealist', partner.areaList);
router.post('/partner/area/create', partner.createArea);
router.put('/partner/area/:id', partner.updateArea);


//------------------------ stick Add-on ---------------------------------------
router.get('/sticker/', sticker.getAll);
router.get('/sticker/:id', sticker.get);
router.post('/sticker/create', sticker.create);
router.put('/sticker/:id', sticker.update);
router.delete('/sticker/:id', sticker.delete);


module.exports = router;