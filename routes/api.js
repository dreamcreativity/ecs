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

/* GET users listing. */
router.get('/', function(req, res) {
  res.json({ 
    		a: 1,
    		b: 'sss'
    	 });
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

//GET a student by student ID
router.get('/materials/:id', student.getStudentbyId);

//POST : create a student record
router.post('/materials', student.create);

//PUT : Edit a student info
router.put('/materials/:id', student.edit)

//----------------------Regions---------------------------------------

//GET all regions
router.get('/regions',region.getAllRegions);

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

//POST create a new course
router.post('/activities', activity.create);

//GET a course
router.get('/activities/:id', activity.getActivitybyId);






module.exports = router;