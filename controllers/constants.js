var constant = require('../constants.js');


//GET: all regions
exports.get = function (req,res){

	var name = req.params.name;
	console.log(constant['CourseType']);

	if( name in constant){
		res.json({
			status: 'ok',
			messages: 'successed',
			data: constant[name]
		});
	}else{
		res.json({
			status: 'fail',
			messages: 'no constants for ' + name,
			data: []
		});
	}
}
