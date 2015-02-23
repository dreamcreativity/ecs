var express = require('express');
var router = express.Router();
var template = require('../modules/templateController');
var staff =require('../controllers/staff');

/* GET home page. */


router.get('/', function(req, res) {
	template(req,res,'admin_main','admin/dashboard.html',
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


router.get('/slider/new', function(req, res) {
	template(req,res,'admin_main','admin/slider_new.html',
			{ 
				title: 'New Slider',
				category: 'Management',
				cur_tap: 'Slider',
				cur_selected : 'New Slider'
			}
		);
});
router.get('/slider/edit', function(req, res) {
	template(req,res,'admin_main','admin/slider_edit.html',
			{ 
				title: 'Edit Slider',
				category: 'Management',
				cur_tap: 'Slider',
				cur_selected : 'Edit Slider'
			}
		);
});


router.get('/staff/all', function(req, res) {

	template(req,res,'admin_main','admin/staff/staffs.html',
			{ 
				title: 'Staffs',
				category: 'Management',
				cur_tap: 'Staff',
				cur_selected : 'Staffs'
			}
		);
});

router.get('/staff/new', function(req, res) {
	template(req,res,'admin_main','admin/staff/staff_new.html',
			{ 
				title: 'New Staff',
				category: 'Management',
				cur_tap: 'Staff',
				cur_selected : 'New Staff'
			}
		);
});
router.get('/staff/edit/:id', function(req, res) {

	template(req,res,'admin_main','admin/staff/staff_edit.html',
			{ 
				title: 'Edit Staff',
				category: 'Management',
				cur_tap: 'Staff',
				cur_selected : 'Edit Staff',
				url_params : req.params

			}
		);
});

router.get('/material/all', function(req, res) {

	template(req,res,'admin_main','admin/others/materials.html',
			{ 
				title: 'Materials',
				category: 'Management',
				cur_tap: 'Material',
				cur_selected : 'Material'
			}
		);
});

router.get('/blog/all', function(req, res) {

	template(req,res,'admin_main','admin/others/blogs.html',
			{ 
				title: 'Blogs',
				category: 'Management',
				cur_tap: 'Others',
				cur_selected : 'Blog'
			}
		);
});

router.get('/student/all', function(req, res) {

	template(req,res,'admin_main','admin/student/student.html',
			{ 
				title: 'Student',
				category: 'Management',
				cur_tap: 'Student',
				cur_selected : 'Student'
			}
		);
});



module.exports = router;

