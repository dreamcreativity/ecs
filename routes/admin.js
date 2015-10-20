var express = require('express');
var router = express.Router();
var template = require('../modules/templateController');
// var emailSender = require('../modules/emailSenderController');
var staff =require('../controllers/staff');
var constants = require("../constants");

/* GET home page. */

//staff.ensureAuthorized
router.get('/', function(req, res) {
	template(req,res,'admin_main','admin/dashboard.html',
			{ 
				title: 'Home',
				category: 'Dashboard',
				cur_tap: '',
				cur_selected : '',
				staff_signin_require: true
			},
			function(){

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


router.get('/logout', function(req, res) {


	// template(req,res,'admin_bg_paint','admin/login.html',
	// 		{ 
	// 			title: 'Login',
	// 			category: '',
	// 			cur_tap: 'Login',
	// 			cur_selected : ''
	// 		}
	// 	);

	Staff.logout(req,res);

});


/*---------------------------------------
	Profile
/----------------------------------------
*/
router.get('/profile', function(req, res) {


	template(req,res,'admin_main','admin/profile.html',
			{ 
				title: 'Staff Profile',
				category: 'Management',
				cur_tap: 'System',
				cur_selected : 'Profile'
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
				cur_selected : 'Create'
			}
		);
});


router.get('/slider/edit/:id', function(req, res) {
	template(req,res,'admin_main','admin/slider/slider_edit.html',
			{ 
				title: 'Edit Slider',
				category: 'Management',
				cur_tap: 'Slider',
				cur_selected : 'Edit',
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
				cur_selected : 'All'
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
				category: 'Website Media',
				cur_tap: 'Media',
				cur_selected : 'Upload',
				constants : constants,
			}
		);
});

router.get('/media/all', function(req, res) {
	template(req,res,'admin_main','admin/media/list.html',
			{ 
				title: 'Medias',
				category: 'Website Medias',
				cur_tap: 'Media',
				cur_selected : 'All',
				constants : constants
			}
		);
});

router.get('/media/edit/:id', function(req, res) {
	template(req,res,'admin_main','admin/media/edit.html',
			{ 
				title: 'Media Uploader',
				category: 'Website Medias',
				cur_tap: 'Media',
				cur_selected : 'Edit',
				constants : constants,
				url_params : req.params
			}
		);
});

/*---------------------------------------
	Staff
/----------------------------------------
*/

router.get('/staff/all', function(req, res) {
	template(req,res,'admin_main','admin/staff/staffs.html',
			{ 
				title: 'Staffs',
				category: 'Management',
				cur_tap: 'Staff',
				cur_selected : 'All'
			}
		);
});

router.get('/staff/detail/:id', function(req, res) {
	template(req,res,'admin_main','admin/staff/detail.html',
			{ 
				title: 'Staffs',
				category: 'Management',
				cur_tap: 'Staff',
				cur_selected : 'Edit',
				url_params : req.params
			}
		);
});

router.get('/staff/create', function(req, res) {
	template(req,res,'admin_main','admin/staff/staff_new.html',
			{ 
				title: 'Staffs',
				category: 'Management',
				cur_tap: 'Staff',
				cur_selected : 'Create'
			}
		);
});

/*---------------------------------------
	Material
/----------------------------------------
*/

router.get('/material/all', function(req, res) {

	template(req,res,'admin_main','admin/material/list.html',
			{ 
				title: 'Materials',
				category: 'Management',
				cur_tap: 'Material',
				cur_selected : 'All'
			}
		);
});

router.get('/material/edit/:id', function(req, res) {

	template(req,res,'admin_main','admin/material/edit.html',
			{ 
				title: 'Edit Material',
				category: 'Management',
				cur_tap: 'Material',
				cur_selected : 'Edit',
				constants : constants,
				url_params : req.params
			}
		);
});

router.get('/material/new', function(req, res) {

	template(req,res,'admin_main','admin/material/add.html',
			{ 
				title: 'New Material',
				category: 'Management',
				cur_tap: 'Material',
				cur_selected : 'Create',
				constants : constants
			}
		);
});


/*---------------------------------------
	Blog
/----------------------------------------
*/

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
				cur_selected : 'All'
			}
		);
});

router.get('/student/create', function(req, res) {
	template(req,res,'admin_main','admin/student/student_new.html',
			{ 
				title: 'Student',
				category: 'Management',
				cur_tap: 'Student',
				cur_selected : 'Create',
				url_params : req.params
			}
		);
});

router.get('/student/create/:id', function(req, res) {
	template(req,res,'admin_main','admin/student/student_new.html',
			{ 
				title: 'Student',
				category: 'Management',
				cur_tap: 'Student',
				cur_selected : 'Create Student with Agent',
				url_params : req.params
			}
		);
});

router.get('/student/extending/:id', function(req, res) {
	template(req,res,'admin_main','admin/student/student_extending.html',
			{ 
				title: 'Student',
				category: 'Management',
				cur_tap: 'Student',
				cur_selected : 'Extending course',
				url_params : req.params
			}
		);
});

router.get('/student/payment/:id', function(req, res) {
	template(req,res,'admin_main','admin/student/payment.html',
			{ 
				title: 'Student',
				category: 'Management',
				cur_tap: 'Student',
				cur_selected : 'Payment',
				url_params : req.params
			}
		);
});


router.get('/student/agent/create', function(req,res){
	res.render('admin/student/studentbyAgent_new.html');
})

router.get('/student/edit/:id', function(req, res) {

	template(req,res,'admin_main','admin/student/student_edit.html',
			{ 
				title: 'Student',
				category: 'Management',
				cur_tap: 'Student',
				cur_selected : 'Edit',
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
				cur_selected : 'All',
			}
		);
});

router.get('/agent/detail/:id', function(req, res) {
	template(req,res,'admin_main','admin/agent/detail.html',
			{ 
				title: 'Agent',
				category: 'Management',
				cur_tap: 'Agent',
				cur_selected : 'Edit',
				url_params : req.params
			}
		);
});


router.get('/agent/create', function(req, res) {
	template(req,res,'admin_main','admin/agent/agent_new.html',
			{ 
				title: 'Agent',
				category: 'Management',
				cur_tap: 'Agent',
				cur_selected : 'Create'
			}
		);
});

//-----------------------Pormotion---------------------------------
router.get('/promotion/all', function(req, res){
	template(req,res,'admin_main','admin/promotion/promotions.html',
	{
		title : 'Promotion',
		category : 'Management',
		cur_tap : 'Promotion',
		cur_selected : 'All'
	});
});

router.get('/promotion/create', function(req,res){
	template(req,res,'admin_main','admin/promotion/promotion_new.html',
	{
		title : 'Promotion',
		category : 'Management',
		cur_tap : 'Promotion',
		cur_selected : 'Create'
	});
})

//---------------------Courses----------------------------------------
router.get('/course/all', function(req,res){
	template(req,res,'admin_main', 'admin/course/course.html', 
	{
		title : 'Course',
		category : 'Management',
		cur_tap : 'Course',
		cur_selected : 'All'
	});
});

router.get('/course/create', function(req, res) {
	template(req,res,'admin_main', 'admin/course/course_new.html', 
	{
		title : 'Course',
		category : 'Management',
		cur_tap : 'Course',
		cur_selected : 'Create'
	});
});

router.get('/course/edit/:id', function(req, res) {
	template(req,res,'admin_main','admin/course/course_edit.html',
			{ 
				title: 'Course',
				category: 'Management',
				cur_tap: 'Course',
				cur_selected : 'Edit',
				url_params : req.params
			}
		);
});

//-----------------------Activity-----------------------------------------
router.get('/activity/all', function(req,res) {
	template(req,res,'admin_main', 'admin/activity/activity.html', 
		{
			title : 'Activity',
			category : 'Management',
			cur_tap : 'Activity',
			cur_selected : 'All'
		});
});

router.get('/activity/create', function(req, res) {
	template(req,res,'admin_main', 'admin/activity/activity_new.html', 
		{
			title : 'Create Activity',
			category : 'Management',
			cur_tap : 'Activity',
			cur_selected : 'Create'
		});
});

router.get('/activity/edit/:id', function(req, res) {
	template(req,res,'admin_main', 'admin/activity/activity_edit.html', 
		{
			title : 'Edit Activity',
			category : 'Management',
			cur_tap : 'Activity',
			cur_selected : 'Edit',
			url_params : req.params
		});
});

//-------------------------Region-------------------------------------------
// router.get('/region/all', function(req,res){
// 	template(req,res,'admin_main','admin/region/region.html',
// 	{
// 		title: 'Region',
// 		category : 'Management',
// 		cur_tap : 'Region',
// 		cur_selected : 'Region'
// 	});
// });

// router.get('/region/create', function(req, res) {
// 	template(req,res,'admin_main','admin/region/region_new.html',
// 	{
// 		title: 'Create Region',
// 		category : 'Management',
// 		cur_tap : 'Region',
// 		cur_selected : 'Create'
// 	});
// });

// router.get('/region/edit/:id', function(req, res) {
// 	template(req,res,'admin_main', 'admin/region/region_edit.html', 
// 		{
// 			title : 'Edit Region',
// 			category : 'Management',
// 			cur_tap : 'Region',
// 			cur_selected : 'Edit',
// 			url_params : req.params
// 		});
// });

//--------------------------Event--------------------------------------------

router.get('/event/all', function(req,res){
	template(req,res,'admin_main','admin/event/event.html',
	{
		title: 'Event',
		category : 'Management',
		cur_tap : 'Event',
		cur_selected : 'All'
	});
});

router.get('/event/create', function(req, res) {
	template(req,res,'admin_main', 'admin/event/event_new.html', 
		{
			title : 'Create Event',
			category : 'Management',
			cur_tap : 'Event',
			cur_selected : 'Create'
		});
});

router.get('/event/detail/:id', function(req, res) {
	template(req,res,'admin_main', 'admin/event/event_edit.html', 
		{
			title : 'Edit Event',
			category : 'Management',
			cur_tap : 'Event',
			cur_selected : 'Edit',
			url_params : req.params
		});
});










module.exports = router;

