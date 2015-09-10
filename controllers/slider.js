var Slider = require('../models/slider');
var Media = require('../models/media');
var fs = require('fs');

// Insert a new Slider record
exports.create = function(req,res){

	console.log(req.body);
	var newSlider = new Slider(req.body);
	console.log(newSlider);

	newSlider.save(function(err,result){
		if(err){
			res.json({
				status: 'fail',
				messages: err,
				data: null
			});
		}
		res.json({
			status: 'ok',
			messages: 'successed',
			data: result
		});
	});
}

exports.get = function(req,res){
	var id = req.params.id;
	Slider.find({_id:id}, function(err, result){
		if(err) {
			res.json({
				status: 'fail',
				messages: err,
				data: null
			});
		}
		if(result.length == 1){
			var s = result[0].toObject();
			if(s.resource != null){
				Media.find({_id:s.resource}, function(err1, result1){
					
					if(err1){
						res.json({
							status: 'fail',
							messages: "can not get result media ",
							data: null
						});
					}else{

						s.media = result1[0].toObject();
			
						res.json({
							status: 'ok',
							messages: 'successed',
							data: s
						});	

					}
				});

			}else{
				
				res.json({
					status: 'ok',
					messages: 'successed',
					data: s
				});	
			}

		}else{
			res.json({
				status: 'fail',
				messages: "multipulte result",
				data: null
			});
		}
		
	});

}

exports.all = function(req,res){

	Slider.find({}, function(err, result){
		if(err) {
			res.json({
				status: 'fail',
				messages: err,
				data: null
			});
		}
		res.json({
				status: 'ok',
				messages: 'successed',
				data: result
			});
		
	});

}


exports.edit = function(req,res){

	var update_id = req.params.id;
	var slider = new Slider(req.body);

	delete slider._id;
	delete slider.__v;

	Slider.update({_id:update_id}, req.body, {}, function(err, result){
		if(err){
			res.json({
				status: 'fail',
				messages: err,
				data: null
			});
		}
		else {

			console.log(result);
			res.json({
				status: 'ok',
				messages: 'successed',
				data: result + ' record(s) effected.'
			});	
		}
	});
}


exports.delete = function(req,res){

	var remove_id = req.params.id;
	Slider.find({ _id:remove_id }).remove(function(err,result){

			if(err){
				res.json({
					status: 'fail',
					messages: err,
					data: null
				});
			}
			else {


				// remove file
				res.json({
					status: 'ok',
					messages: 'successed',
					data: result + ' record(s) effected.'
				});	
			}
		});
}






