var express = require('express');
var router = express.Router();
var staff =require('../controllers/staff');


/* GET users listing. */
router.get('/', function(req, res) {
  res.json({ 
    		a: 1,
    		b: 'sss'
    	 });
});


//-------------------------Staff----------------------------------

router.get('/staff/:id',staff.getStaffbyId);

router.post('/staff', staff.create);

router.put('/staff/:id', staff.edit);

router.post('/staff/login', staff.login);

router.get('/staff/getAllstaffs', staff.getAllStaffs);

router.delete('/staff/:id',staff.delete);


module.exports = router;