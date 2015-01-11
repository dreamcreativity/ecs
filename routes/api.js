var express = require('express');
var router = express.Router();


/* GET users listing. */
router.get('/', function(req, res) {
  res.json({ 
    		a: 1,
    		b: 'sss'
    	 });
});


module.exports = router;