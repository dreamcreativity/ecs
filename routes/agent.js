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
				cur_tap: '',
				cur_selected : ''
			}
		);
});

router.get('/create', function(req, res) {
	template(req,res,'agent_main','agent/register.html',
			{ 
				title: 'Home',
				category: 'Students',
				cur_tap: 'Student',
				cur_selected : 'Create'
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


router.get('/materials/all', function(req, res) {
	template(req,res,'agent_main','agent/material/material.html',
			{ 
				title: 'Materials',
				category: 'Agent',
				cur_tap: 'Materials',
				cur_selected : ''
			}
		);
});

router.get('/material/detail/:id', function(req, res) {
	template(req,res,'agent_main','agent/material/detail.html',
			{ 
				title: 'Materials Detail',
				category: 'Agent',
				cur_tap: 'Materials',
				cur_selected : 'Detail',
				url_params : req.params
			}
		);
});

router.get('/student/all', function(req, res) {
	template(req,res,'agent_main','agent/studentForms/students.html',
			{ 
				title: 'Student',
				category: 'Students',
				cur_tap: 'Student',
				cur_selected : 'All'
			}
		);
});

router.get('/student/detail/:id', function(req, res) {
	template(req,res,'agent_main','agent/studentForms/detail.html',
			{ 
				title: 'Student',
				category: 'Students',
				cur_tap: 'Student',
				cur_selected : 'Edit',
				url_params : req.params
			}
		);
});

router.get('/student/commission/:id', function(req, res) {
	template(req,res,'agent_main','agent/studentForms/commission.html',
			{ 
				title: 'Student',
				category: 'Students',
				cur_tap: 'Student',
				cur_selected : 'Commission',
				url_params : req.params
			}
		);
});

router.get('/invitation/all', function(req, res) {
	template(req,res,'agent_main','agent/studentForms/invitation.html',
			{ 
				title: 'Student',
				category: 'Student',
				cur_tap: 'Invitation',
				cur_selected : 'Send',
				url_params : req.params
			}
		);
});

router.get('/history/student', function(req,res){
	template(req,res,'agent_main','agent/history/students.html',
			{ 
				title: 'Student',
				category: 'History',
				cur_tap: 'Student',
				cur_selected : 'All',
				url_params : req.params
			}
		);
});


router.get('/history/commission', function(req,res){
	template(req,res,'agent_main','agent/history/commission.html',
			{ 
				title: 'Commission',
				category: 'History',
				cur_tap: 'Commission',
				cur_selected : 'All',
				url_params : req.params
			}
		);
});

// router.get('/commission/all', function(req,res){
// 	template(req,res,'agent_main','agent/history/commission.html',
// 			{ 
// 				title: 'Commission',
// 				category: 'History',
// 				cur_tap: 'Commission',
// 				cur_selected : 'All',
// 				url_params : req.params
// 			}
// 		);
// })


router.get('/profile', function(req,res){
	template(req,res,'agent_main', 'agent/profile/profile.html',
	{
		title: 'Profile',
		category : 'Agent',
		cur_tap : 'Profile',
		cur_selected : '',
		url_params : req.params

	});
});

router.get('/profile/all', function(req,res){
	template(req,res,'agent_main', 'agent/profile/profile.html',
	{
		title: 'Profile',
		category : 'Agent',
		cur_tap : 'Profile',
		cur_selected : '',
		url_params : req.params

	});
});

router.get('/edit', function(req,res){
	template(req,res,'agent_main', 'agent/profile/edit.html',
	{
		title: 'Profile',
		category : 'Agent',
		cur_tap : 'Profile',
		cur_selected : 'Edit',
		url_params : req.params

	});
});

router.get('/courseRegisterTemplate', function(req,res){
	res.render('templates/courseRegister.html');
});




module.exports = router;

