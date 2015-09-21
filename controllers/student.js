var Student = require('../models/student');
var Counter = require('../models/counter');
var Agent = require('../models/agent');
var Accommodation = require('../models/accommodation');
var FlightInfo = require('../models/flightInfo');
var ProgramRegistration = require('../models/programRegistration')
var EmailSender = require('../modules/emailModule');
var Pdf = require('../modules/pdfModule');
var constant = require('../constants.js');
var async = require("async");

async = require("async");

exports.create = function(req,res){
	var newStudent = new Student(req.body);
	Counter.findAndModify('student_id', function (err, counter) {
  		if (err) {
        	res.json({
					type:false,
					data:"Error occured: " +err
				});
    	}

     	newStudent.studentID = counter.next;
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
	});
}

exports._createStudent = function(data){
	Counter.findAndModify('student_id', function(err, counter){
		if(err){ return null;}
		else {
			data.studentID = counter.next;
			data.save(function(err, result){
				if(err){
					return null;
				}
				else 
				{
					return result.data;
				}
			});
		}
	});
}

exports.register = function(req,res){
	var student = new Student(req.body.student);
	var accommodation = new Accommodation(req.body.accommodation);
	var flightInfo = new FlightInfo(req.body.flightInfo);
	var programs = req.body.courseList; 

	async.waterfall([
		function(callback){
			var accommodation_id =null;
			accommodation.save(function(err,result){
				if(err){}
					else {
						accommodation_id = result._id;
						student.accommodation = accommodation_id;
						callback();
					}
				});
		},
		function(callback){
			var flightInfo_id = null;
			flightInfo.save(function(err,result){
				if(err){}
					else {
						flightInfo_id = result._id;
						student.flightInfo = flightInfo_id;
						callback();
					}
				});
		},
		function(callback){
			var programRegistration_ids = [];
			async.eachSeries(programs, function(item){
				var obj = new ProgramRegistration(item);
				obj.save(function(err,result){
					if(err){}
						else {
							programRegistration_ids.push(result._id);
						}
					});
			},function done(){
				student.programRegistration = programRegistration_ids;
				callback();
			});
		},
		function(callback){
			var obj =null;
			Counter.findAndModify('student_id', function(err, counter){
				if(err){ return null;}
				else {
					student.studentID = counter.next;
					student.save(function(err, result){
						if(err){}
							else {
								obj = result;
							}
						});
				}
			});
			callback(null, obj)
		}
		],function(err, result){
			if(err){
				res.json({
					type:false,
					data:"Error occured: " +err
				});
			}
			else {
				if(!result){
					res.json({
						type:false,
						data:"Error occured: " +err
					});
				}
				else {
					res.json({
						status: 'ok',
						messages: 'successed',
						data: result
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
				data: result
			});
		}
	});
}

var _createAccommodation =function(data){
	data.save(function(err,result){
		if(err){
			return null;
		}
		else {
			return result.data._id;
		}
	});
}

//Create a flight information for student
exports.createFlightInfo = function(req,res){
	var flightInfo = new FlightInfo(req.body);
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
				data: result
			});
		}
	});
}

var _createFlightInfo = function(data){
	data.save(function(err, result){
		if(err){
			return null;
		}
		else {
			return result.data._id;
		}
	});
}

var _createProgramRegistration = function(data_list){
	var programRegistration_ids = [];
	async.eachSeries(data_list, function(item){
		var obj = new ProgramRegistration(item);
		obj.save(function(err,result){
			if(err){}
				else {
					programRegistration_ids.push(result.data._id);
				}
			});
	},function done(){
		return programRegistration_ids;
	});
}


exports.generatePDF = function (req,res){
	var id = req.body.registerId;
	var variables_list = [];
	Student.find({_id : id}, function(err, result){
		if(err){
			res.json(
			{
				status: 'fail',
				messages: err,
				data: null
			});			
		}
		else {
			var obj = result[0];
			for (var key in constant.RegistrationTemplateVars) {
					constant.RegistrationTemplateVars[key] = obj[key];
				};

			Pdf.getPdfTemplate('registration.html',function(data){

				var htmlTemplate = data;
				htmlTemplate = Pdf.replaceTamplateValue(htmlTemplate,constant.RegistrationTemplateVars);


				// replate variables
				Pdf.generatePDF(htmlTemplate, function(message, path){
					if(message == "success"){
						res.json({
							status: 'successed',
							data : path
						});
					}
					else {
						res.json({
							status: 'fail',
							data : null
						});
					}
				});
			});
		}
	})
}


exports.sendEmail = function(req,res){
	var message = "";
	var to = req.body.to;
	var subject = req.body.subject;
	var context = req.body.context;
	var attachments = req.body.attachments;
	EmailSender.sendEmail(to,subject,context,attachments, function(message){
		res.json(
			{
				returnmessage : message
			});		
	});
}


















