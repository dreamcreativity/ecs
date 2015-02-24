var express = require('express');
var router = express.Router();
var staff =require('../controllers/staff');
var student =require('../controllers/student');
var agent =require('../controllers/agent');
var material = require('../controllers/material');
var slider =require('../controllers/slider');


/* GET users listing. */
router.get('/', function(req, res) {
  res.json({ 
    		a: 1,
    		b: 'sss'
    	 });
});



//-------------------------Slider----------------------------------
router.post('/slider', slider.create);
router.get('/slider/:id', slider.get);
router.get('/slider', slider.all);
router.put('/slider/:id', slider.edit);

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

//POST : create a student record
router.post('/student', student.create);

//PUT : Edit a student info
router.put('/student/:id', student.edit)


//----------------------Agent----------------------------------------


//-----------------------Materials ----------------------------------

//GET a student by student ID
router.get('/materials/:id', student.getStudentbyId);

//POST : create a student record
router.post('/materials', student.create);

//PUT : Edit a student info
router.put('/materials/:id', student.edit)





module.exports = router;