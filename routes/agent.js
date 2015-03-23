var express = require('express');
var router = express.Router();
var template = require('../modules/templateController');
var staff =require('../controllers/staff');

/* GET home page. */


router.get('/', function(req, res) {
	template(req,res,'agent_main','agent/dashboard.html',
			{ 
				title: 'Home',
				category: 'Dashboard',
				cur_tap: 'Dashboard',
				cur_selected : ''
			}
		);
});


router.get('/login', function(req, res) {
	template(req,res,'admin_bg_paint','admin/login.html',
			{ 
				title: 'Login',
				category: '',
				cur_tap: 'Login',
				cur_selected : ''
			}
		);
});


router.get('/material', function(req, res) {
	template(req,res,'agent_main','agent/material.html',
			{ 
				title: 'Login',
				category: '',
				cur_tap: 'Login',
				cur_selected : ''
			}
		);
});





module.exports = router;

