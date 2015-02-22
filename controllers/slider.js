var Slider = require('../models/slider');


// Insert a new Slider record
exports.create = function(req,res){
	var newSlider = new Slider(req.body);
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

exports.get = function(req,res){
	console.log('get slider');

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
			res.json({
				status: 'ok',
				messages: 'successed',
				data: result[0]
			});	
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

	var id = req.params.id;
	var slider = new Slider(req.body);
	slider._id = id;

	Slider.update({_id:id}, slider, { multi: false }, function(err, result){
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



