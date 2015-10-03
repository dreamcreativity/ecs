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
	template(req,res,'agent_main','agent/profile/resetpassword.html',
			{ 
				title: 'Reset password',
				category: 'profile',
				cur_tap: 'Profile',
				cur_selected : 'Rest password'
			}
		);
});

router.get('/setnewPassword', function(req,res){
	template(req,res,'agent_bg_paint','agent/setnewpassword.html',
			{ 
				title: 'Reset password',
				category: 'profile',
				cur_tap: 'Profile',
				cur_selected : 'Rest password'
			}
		);
});


router.get('/material', function(req, res) {
	template(req,res,'agent_main','agent/profile/material.html',
			{ 
				title: 'Login',
				category: '',
				cur_tap: 'Login',
				cur_selected : ''
			}
		);
});

router.get('/students', function(req, res) {
	template(req,res,'agent_main','agent/studentForms/students.html',
			{ 
				title: 'Student',
				category: 'Students',
				cur_tap: 'Students',
				cur_selected : ''
			}
		);
});

router.get('/students/detail/:id', function(req, res) {
	template(req,res,'agent_main','agent/studentForms/detail.html',
			{ 
				title: 'Student',
				category: 'Students',
				cur_tap: 'Students',
				cur_selected : 'Detail',
				url_params : req.params
			}
		);
});

router.get('/students/invitation', function(req, res) {
	template(req,res,'agent_main','agent/studentForms/invitation.html',
			{ 
				title: 'Student',
				category: 'Student',
				cur_tap: 'Invitation',
				cur_selected : '',
				url_params : req.params
			}
		);
});

router.get('/profile', function(req,res){
	template(req,res,'agent_main', 'agent/profile/profile.html',
	{
		title: 'Profile',
		category : 'Profile',
		cur_tap : 'Profile',
		cur_selected : '',
		url_params : req.params

	});
});

router.get('/edit', function(req,res){
	template(req,res,'agent_main', 'agent/edit.html',
	{
		title: 'Profile',
		category : 'Profile',
		cur_tap : 'Profile',
		cur_selected : 'Edit',
		url_params : req.params

	});
});





module.exports = router;

