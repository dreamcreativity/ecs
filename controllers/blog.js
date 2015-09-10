var Blog = require('../models/staff');
var mongoose = require('mongoose');


//POST: create new blog
exports.create = function(req,res){
	var newBlog = new Blog(req.body);
	newBlog.save(function(err ,result){
		if(err){
			res.json({
				type:false,
				data:"Error occured: " +err
			});
		}
		res.json({
			type:true,
			data:result
		});
	});
}


//PUT : Edit blog
exports.edit = function (req,res) {
	var id = req.params.id;
	var blog = new Blog(req.body);
	Blog.update({_id:id}, blog, function(err, result){
		if(err){
			res.json({
				type: false,
				data: 'Error occured: ' + err}
				);
		}
		res.json({
			type:true,
			data: result
		});
}

//GET all blogs
exports.blogs = function(req,res){
	Blog.find({},function(err,results){
		if(err){
			res.json(
				{
					type: true,
					data: 'Error occured: ' + err
				});			
				}
		res.json({
			type: true,
			data: results
		});
	});
}
