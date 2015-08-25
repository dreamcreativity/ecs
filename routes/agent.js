var express = require('express');
var router = express.Router();
var template = require('../modules/templateController');
var staff =require('../controllers/staff');

var auth = require('../controllers/auth');



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

router.get('/register', function(req, res) {
	template(req,res,'agent_main','agent/register.html',
			{ 
				title: 'Home',
				category: 'Student',
				cur_tap: 'Registeration',
				cur_selected : ''
			}
		);
});


router.get('/login', function(req, res) {
	template(req,res,'agent_bg_paint','agent/login.html',
			{ 
				title: 'Login',
				category: '',
				cur_tap: 'Login',
				cur_selected : ''
			}
		);
});

router.get('/resetpassword', function(req, res) {
	template(req,res,'agent_bg_paint','agent/resetpassword.html',
			{ 
				title: 'Reset password',
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

