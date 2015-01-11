var express = require('express');
var router = express.Router();



/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express 333' });
});
router.get('/', function(req, res) {
  res.render('page2', { title: 'Express 333' });
});
module.exports = router;
