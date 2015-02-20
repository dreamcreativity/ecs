var express = require('express');
var router = express.Router();
var template = require('../modules/templateController');

/* GET home page. */


router.get('/', function(req, res) {
	template(req,res,'admin_main','admin/dashboard.html',{ title: 'Home - English School of Canada' });
});

router.get('/login', function(req, res) {
	template(req,res,'admin_bg_paint','admin/login.html',{ title: 'Login - English School of Canada' });
});



module.exports = router;

