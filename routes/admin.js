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

/*---------------------------------------
	Silder 
/----------------------------------------
*/
router.get('/slider/new', function(req, res) {
	template(req,res,'admin_main','admin/slider/slider_new.html',
			{ 
				title: 'New Slider',
				category: 'Management',
				cur_tap: 'Slider',
				cur_selected : 'New Slider'
			}
		);
});


router.get('/slider/edit/:id', function(req, res) {
	template(req,res,'admin_main','admin/slider/slider_edit.html',
			{ 
				title: 'Slider Tile',
				category: 'Management',
				cur_tap: 'Slider',
				cur_selected : 'Edit Slider',
				url_params : req.params
			}
		);
});

router.get('/slider/all', function(req, res) {
	template(req,res,'admin_main','admin/slider/slider_list.html',
			{ 
				title: 'Edit Slider',
				category: 'Management',
				cur_tap: 'Slider',
				cur_selected : 'Edit Slider'
			}
		);
});

/*---------------------------------------
	Media
/----------------------------------------
*/

router.get('/media/uploader', function(req, res) {
	template(req,res,'admin_main','admin/media/uploader.html',
			{ 
				title: 'Media Uploader',
				category: 'Media',
				cur_tap: 'Media Uploader',
				cur_selected : 'Upload'
			}
		);
});

router.get('/media/editor', function(req, res) {
	template(req,res,'admin_main','admin/media/editor.html',
			{ 
				title: 'Media Uploader',
				category: 'Media',
				cur_tap: 'Media Uploader',
				cur_selected : 'Editor'
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

router.get('/staff/detail/:id', function(req, res) {
	template(req,res,'admin_main','admin/staff/detail.html',
			{ 
				title: 'Staffs',
				category: 'Management',
				cur_tap: 'Profile',
				cur_selected : 'Profile',
				url_params : req.params
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

router.get('/staff/create', function(req, res) {
	res.render('admin/staff/staff_new.html');
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

//--------------------------Students-----------------------------------

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

router.get('/student/edit/:id', function(req, res) {

	template(req,res,'admin_main','admin/student/student_edit.html',
			{ 
				title: 'Student',
				category: 'Management',
				cur_tap: 'Student',
				cur_selected : 'Edit Student',
				url_params : req.params
			}
		);
});

//-----------------------Agent--------------------------------------

router.get('/agent/all', function(req, res) {
	template(req,res,'admin_main','admin/agent/agent.html',
			{ 
				title: 'Agent',
				category: 'Management',
				cur_tap: 'Agent',
				cur_selected : 'Agent',
			}
		);
});

router.get('/agent/:id', function(req, res) {
	template(req,res,'admin_main','admin/agent/agent_detail.html',
			{ 
				title: 'Agent',
				category: 'Management',
				cur_tap: 'Agent',
				cur_selected : 'Agent',
				url_params : req.params
			}
		);
});

// router.get('/agent/new', function(req, res) {
// 	template(req,res,'admin_main','admin/agent/agent_create.html',
// 			{ 
// 				title: 'New Agent',
// 				category: 'Management',
// 				cur_tap: 'Agent',
// 				cur_selected : 'New Agent',
// 				url_params : req.params
// 			}
// 		);
// });





module.exports = router;

