
// Native modules.
var fs = require("fs");
// 3rd party modules.
var ejs = require("ejs");



module.exports = function (req, res, template_name, subview_file, parms){
		subview_content = fs.readFileSync(__dirname + '/../views/' + subview_file , 'utf-8'),
	    html = ejs.render(subview_content, parms);
	  	res.render('templates/' + template_name, { request: req, body: html, parms: parms });
};