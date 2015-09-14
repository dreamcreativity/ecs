var Student = require('../models/student');
var Agent = require('../models/agent');
var Accommodation = require('../models/agent');
var FlightInfo = require('../models/agent');

async = require("async");

// Insert a new student record
exports.create = function(req,res){
	var newStudent = new Student(req.body);

	Student.findOne({student_id : newStudent.student_id}, function(err, student){
		if(err){
			res.json({
				type:false,
				data: "Error occured: " +err
			});
		}
		else {
			if(student){
				res.json({
					type:false,
					data:"Student ID  is already exists"
				});
			}else {

				newStudent.save(function(err,result){
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
		}
	});
}

//GET All Students
exports.getStudents = function(req,res){
	var studentList = [];
	Student.find({}, function(err, results){
		if(err) {
			res.json('Error occured: ' + err);
		}

		async.eachSeries(results, function(item,callback){
			Agent.find({_id: item.agent_id}).lean().exec(function (err, results){
				if(err){

				}
				item.agent = results[0];
				studentList.push(item);
				callback();
			});
		}, function(err, results){
			if(err){

			}
			res.json({
				type: true,
				data: studentList
			});
		});
	})};


//GET: Student rows by student ID
exports.getStudentbyStudentId = function(req,res){
	var id = req.params.id;
	Student.find({student_id:id}, function(err, result){
		if(err) {
			res.json('Error occured: ' + err);
		}
		res.json({
			type: true,
			data: result
		});
	});
}

//GET: Student by Id
exports.getStudentbyId = function(req,res){
	var id = req.params.id;
	Student.find({_id:id}, function(err, result){

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


//GET: Student rows by student ID
exports.getStudentbyAgentId = function(req,res){
	var id = req.params.id;
	Student.find({agent_id:id}, function(err, result){
		if(err) {
			res.json('Error occured: ' + err);
		}
		res.json({
			type: true,
			data: result
		});
	});
}


//PUT: 
exports.edit = function(req,res){
	var id = req.params.id;
	//var Student = new Student(req.body);
	Student.update({_id:id}, req.body, function(err, result){
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
	});
}

//Set Student is Quit

exports.quit = function(req,res){
	
} 


//Create a accommodation for student
exports.createAccommodation = function(req,res){
	var accommodation = new Accommodation(req.body);
	accommodation.save(function(err, result){
		if(err){
			res.json({
				status: 'fail',
				messages: err,
				data: null
			});
		}
		else {
			res.json({
				status: 'ok',
				messages: 'successed',
				data: result[0]
			});
		}
	});
}

//Create a flight information for student
exports.createFlightInfo = function(req,res){
	var flightInfo = new flightInfo(req.body);
	flightInfo.save(function(err, result){
		if(err){
			res.json({
				status: 'fail',
				messages: err,
				data: null
			});
		}
		else {
			res.json({
				status: 'ok',
				messages: 'successed',
				data: result[0]
			});
		}
	});
}





















