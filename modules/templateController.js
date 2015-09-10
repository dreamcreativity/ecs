
// Native modules.
var fs = require("fs");
// 3rd party modules.
var ejs = require("ejs");



module.exports = function (req, res, template_name, subview_file, parms, callFirst){
	
		if ( typeof callFirst !== 'undefined')
			callFirst();

		// login check
		// var sess=req.session;
		// if ( typeof parms.staff_signin_require !== 'undefined' && parms.staff_signin_require ==  true){
		// 	if(typeof sess.StaffSession === 'undefined'){
		// 		res.redirect('/admin/login');			
		// 	}
		// }
		

		subview_content = fs.readFileSync(__dirname + '/../views/' + subview_file , 'utf-8'),
	    html = ejs.render(subview_content, parms);
	  	res.render('templates/' + template_name, { request: req, body: html, parms: parms });
};