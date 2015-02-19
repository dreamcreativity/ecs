var express = require('express');
var router = express.Router();
var template = require('../modules/templateController');

/* GET home page. */


router.get('/', function(req, res) {
	template(req,res,'admin_main','client/index.html',{ title: 'Express 333' });
});
/*
router.get('/login', function(req, res) {
	template.LoadTemplate(req,res,'admin_main','login.html',{ title: 'Express 333' });
});
*/






module.exports = router;

