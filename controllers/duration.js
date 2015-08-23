var Duration = require('../models/duration');
var mongoose = require('mongoose');

//POST: create new Course
exports.create = function function_name (req,res) {
	
	var newDuration = new Duration(req.body);

	newDuration.save(function(err, result){
		if(err){
			res.json({
				status: 'fail',
				messages: err,
				data:null
			});
		}
		else {
			res.json({
				status: 'ok',
				messages: 'successed',
				data: result
			});	
		}
	});


}

//PUT: 
exports.edit = function(req,res){
	var id = req.params.id;
	req.body.lastModify = Date.now();
	//console.log(req.body);

	res.json({
						status: 'fail',
						messages: "multipulte result",
						data: null
					});
	

} 