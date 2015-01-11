var express = require('express');
var router = express.Router();


/* GET users listing. */
router.get('/', function(req, res) {
  res.json({ 
    		a: 1,
    		b: 'api 2'
    	 });
});

router.get('/add', function(req, res) {
  res.json({ 
    		a: 2,
    		b: 'api add user'
    	 });
});



module.exports = router;