var Slider = require('../models/slider');


// Insert a new Slider record
exports.create = function(req,res){
	
	var newSlider = new Slider(req.body);
	console.log('try to create a new slide node');
	console.log(newSlider);

	newSlider.save(function(err,result){
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

exports.sliders = function(req,res){
	
	var newSlider = new Slider(req.body);
	console.log('try to create a new slide node');
	console.log(newSlider);

	newSlider.save(function(err,result){
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

