var Student = require('../models/student');


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
	Student.find({}, function(err, result){
		if(err) {
			res.json('Error occured: ' + err);
		}
		res.json({
			type: true,
			data: result
		});
	});
}


//GET: Student rows by student ID
exports.getStudentbyId = function(req,res){
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
	var Student = new Student(req.body);
	Student.update({_id:id}, staff, function(err, result){
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























