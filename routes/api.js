var express = require('express');
var router = express.Router();
var staff =require('../controllers/staff');
var student =require('../controllers/student');

/* GET users listing. */
router.get('/', function(req, res) {
  res.json({ 
    		a: 1,
    		b: 'sss'
    	 });
});


//-------------------------Staff----------------------------------

router.get('/staffs/:id', staff.ensureAuthorized, staff.getStaffbyId);

router.post('/staffs/decode/:token', staff.decode);

router.post('/staffs', staff.create);

router.put('/staffs/:id', staff.edit);

router.post('/staffs/login', staff.login);

router.get('/staffs', staff.getAllStaffs);

router.delete('/staffs/:id',staff.delete);


//-----------------------Student-----------------------------------

//GET a student by student ID
router.get('/student/:student_id', student.getStudentbyId);

//POST : create a student record
router.post('/student', student.create);

//PUT : Edit a student info
router.put('/student/:id', student.edit)





module.exports = router;