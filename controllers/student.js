var Student = require('../models/student');
var Counter = require('../models/counter');
var Staff = require('../models/staff');
var Token = require('../models/token');
var Agent = require('../models/agent');
var Accommodation = require('../models/accommodation');
var FlightInfo = require('../models/flightInfo');
var ProgramRegistration = require('../models/programRegistration')
var Registration = require('../models/registration');
var EmailSender = require('../modules/emailModule');
var Pdf = require('../modules/pdfModule');
var constant = require('../constants.js');
var async = require("async");
var mongoose = require('mongoose');

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

     	newStudent.studentID = pad(counter.next,6);
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

//Resiteration on Agent port
exports.register = function(req,res){
	var student = new Student(req.body.student);
	var token = req.body.token

	var agentId =req.body.agent;
	var accommodation = new Accommodation(req.body.accommodation);
	var flightInfo = new FlightInfo(req.body.flightInfo);
	var programs = req.body.courseList; 
	var registration = new Registration();
		registration.agent = student.agent;

	async.waterfall([
		function(callback){
			if(token){
				Token.findOne({_id:token}, function(err, result){
						if(!err){
				 			Agent.findOne({_id:result.user}, function(err, result2){
				 				if(!err){
				 					student.agent = result2._id;
				 					callback();
				 				}
				 			});
				 		}
				 		else callback();
				});
			}	
			else callback();
		},
		function(callback){
			if(agentId !=null){
				Agent.find({_id:agentId}, function(err,res){
					if(!err){
						agent = res[0];
					}
					callback();
				});
			}
			else callback();
		},
		function(callback){
			var accommodation_id =null;
			if(accommodation.isHomestay){
				accommodation.numOfWeeks = Math.round((accommodation.endDate-accommodation.startDate)/ 604800000);
				accommodation.save(function(err,result){
					if(err){}
						else {
							accommodation_id = result._id;
							student.accommodation = accommodation_id; //Delete later
							registration.accommodation = accommodation_id;
							callback();
						}
					});
			}
			else callback();
		},
		function(callback){
			var flightInfo_id = null;
			if(accommodation.isHomestay){
				flightInfo.save(function(err,result){
					if(err){}
						else {
							flightInfo_id = result._id;
							student.flightInfo = flightInfo_id; //Delete later
							registration.flightInfo = flightInfo_id;
							callback();
						}
					});
			}
			else callback();
		},
		function(callback){
			var programRegistration_ids = [];
			async.each(programs, function(item, callback2){
				var obj = new ProgramRegistration(item);
				obj.price = item.duration.price;
				obj.coursePeriod = item.duration.title;
				if(agentId) {
					obj.commissionRate = agent.commission;
				}
				obj.save(function(err,result){
					if(err){
						callback2()
					}
					else {
						programRegistration_ids.push(result._id);
						callback2()
					}
				});
			},function(err){
				if(err){
					callback();
				}
				else {
					student.programRegistration = programRegistration_ids; // Delete later
					registration.programRegistration = programRegistration_ids;
					callback();
				}
			});
		},
		function(callback){
			var obj =null;
			Counter.findAndModify('student_id', function(err, counter){
				if(err){ return null;}
				else {
					student.studentID = pad(counter.next,6);
					if(agentId) {
						student.commissionRate = agent.commission;
					}
					student.save(function(err, result){
						if(err){
							callback()
						}
						else {
							registration.student = result._id
							callback()
						}
					});
				}
			});
		},
		function(callback){
			if(programs.length != 0){
				registration.save(function(err, result){
					if(err) {
						callback(null);
					}
					else {
						callback(null,result.student);
					}
				});
			}
			else callback(null, registration.student)
		}],function(err, result){
			if(err){
				res.json({
					type:false,
					data:"Error occured: " +err
				});
			}
			else {
				if(err){
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
	Student.find({}).populate('agent').exec(function(err, results){
		if(err) {
			res.json('Error occured: ' + err);
		}
		else {
			res.json({
				status: 'ok',
				messages: 'successed',
				data: results
			});
		}

	});
}


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
	Student.findOne({_id:id}).populate('agent').populate('accommodation').populate('programRegistration').populate('flightInfo').exec(function(err, result){

		if(err) {
			res.json({
				status: 'fail',
				messages: err,
				data: null
			});
		}
		else{
			res.json({
				status: 'fail',
				messages: "multipulte result",
				data: result
			});
		}
		
	});
}


//GET: Student rows by student ID
exports.getStudentbyAgentId = function(req,res){
	var id = req.params.id;
	Student.find({agent:id}, function(err, result){
		if(err) {
			res.json('Error occured: ' + err);
		}
		res.json({
			type: true,
			data: result
		});
	});
}

//GET: Registration records by ID
exports.getRegistrationById = function(req,res){
	var id = req.params.id;
	var payments = [];
	Registration.find({_id:id}).populate('payments').populate('programRegistration').exec(function(err, result){
		if(err) {
			res.json('Error occured: ' + err);
		}

		console.log(result);
		async.each(result[0].payments, function(item, callback){
			Staff.findOne({_id:item.createBy}, function(err, result1){
				console.log(result1);
				item.createByName = result1.lastname + ' ' + result1.firstname;
				payments.push(item);
				callback();

			})
		},function(err){
			result[0].payments = payments;
			res.json({

			type: true,
			data: result[0]
		});
		});
	});
}


//GET: Registration records by agent ID
exports.getRegistrationByAgent = function(req,res){
	var id = req.params.id;
	Registration.find({agent:id}).populate('accommodation').populate('programRegistration').populate('flightInfo').exec(function(err, result){
		if(err) {
			res.json('Error occured: ' + err);
		}
		res.json({
			type: true,
			data: result
		});
	});
}

//GET : Registration records by Student ID
exports.getRegistrationByStudent = function(req,res){
	var id = req.params.id;
	Registration.find({student:id}).populate('programRegistration').exec(function(err, result){
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
	var programs = req.body.programRegistration;
	var accommodation = req.body.accommodation;
	var flightInfo = req.body.flightInfo;
	req.body.programRegistration =[];
	if(accommodation) req.body.accommodation = accommodation._id;
	if(flightInfo) req.body.flightInfo = flightInfo._id;

	for (var i = 0; i < programs.length; i++) {
		req.body.programRegistration.push(programs[i]._id);
	};

	Student.update({_id:id}, req.body, function(err, result){
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

exports.updateAccommdation = function(req,res){
	var id = req.params.id;
	Accommodation.update({_id:id}, req.body, function(err, result){
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


//Extending courses for student
exports.createExtendingCourse = function(req,res){
	var student_id = req.body.student_id;
	var agent = req.body.agent;
	var programs = req.body.courseList;
	var programRegistration_ids = [];
	var registration = new Registration();
		registration.student = student_id;

	async.each(programs, function(item, callback){
				var obj = new ProgramRegistration(item);
				obj.price = item.duration.price;
				obj.coursePeriod = item.duration.title
				if(agent !=null) {
					obj.commissionRate = agent.commission;
				}
				obj.save(function(err,result){
					if(err){
						callback()
					}
					else {
						programRegistration_ids.push(result._id);
						registration.programRegistration.push(result._id);
						callback()
					}
				});
			},function(err){
				if(err){
					callback();
				}
				else {
					Student.findOne({_id:student_id}, function(err, result){
						if(!err){
							registration.agent = result.agent
							for (var i = 0; i < programRegistration_ids.length; i++) {
								result.programRegistration.push(programRegistration_ids[i]);
							};
							result.save(function(err, result1){
								if(!err){
									registration.save(function(err,result2){
										if(!err){
											res.json({
												status: 'ok',
												messages: 'successed',
												data: result
											});
										}
									});
								}
							})
						}
					});
				}
			});

}

exports.generatePDF = function (req,res){
	var id = req.body.registerId;
	var type = req.body.type;
	var variables_list = [];
	Student.findOne({_id : id}).populate('agent').populate('accommodation').populate('programRegistration').populate('flightInfo').exec(function(err, result){
		if(err){
			res.json(
			{
				status: 'fail',
				messages: err,
				data: null
			});			
		}
		else {
			var student_obj = result;
			var student_accommodation_obj = result.accommodation;
			var student_flightInfo_obj = result.flightInfo;
			var courses_obj = result.programRegistration;

			for (var key in constant.RegistrationTemplateVars) {
					if(key == "type"){
						constant.RegistrationTemplateVars[key] = type;
					}
					else constant.RegistrationTemplateVars[key] = student_obj[key];
				};
			if(student_accommodation_obj){
				for (var key in constant.AccommodationTemplateVars) {
						constant.AccommodationTemplateVars[key] = student_accommodation_obj[key];
					};
			}
			if(student_flightInfo_obj){
				for (var key in constant.FlightTemplateVars) {
						constant.FlightTemplateVars[key] = student_flightInfo_obj[key];
					};
			}


			var listOfCourseRegistration = [];
			for (var i = 0; i < courses_obj.length; i++) {
				var item = courses_obj[i];
				var insertValue = {
					course : item.course,
					title : item.title,
					level : item.level,
					startDate : item.startDate,
					duration : item.duration
				}
				listOfCourseRegistration.push(insertValue);
			};
			var templates = ['mainTemplate.html','secondTemplate.html','studentTemplate.html','courseTemplate.html','accommodationTemplate.html','formTitleTemplate.html'];
			Pdf.getPdfTemplateList(templates,function(data){
				var firstTemplate = [data[0],data[2],data[3],data[4],data[5]];
				var secondTemplate = [data[1],data[2],data[3],data[4],data[5]];
				//Four paramaters should be passed into below function
				//1.constant.RegistrationTemplateVars
				//2.constant.AccommodationTemplateVars
				//3.constant.FlightTemplateVars
				//4.listOfCourseRegistration
				var resultTemplate1 = Pdf.replaceTamplateValue(firstTemplate,constant.RegistrationTemplateVars,
														null,
														null,
														listOfCourseRegistration);

				if(student_accommodation_obj != null && student_flightInfo_obj!=null){
					var resultTemplate2 = Pdf.replaceTamplateValue(secondTemplate,constant.RegistrationTemplateVars,
															constant.AccommodationTemplateVars,
															constant.FlightTemplateVars,
															null);
				};
				//--------------------- replate variables-------------------------------------
				Pdf.generatePDF(resultTemplate1,'register_01', function(message, path){
					var all_path = [];
					if(message == "success"){
						all_path.push(path);
						if(student_accommodation_obj != null && student_flightInfo_obj!=null){
							Pdf.generatePDF(resultTemplate2,'register_02',function(message,path){
								if(message == "success"){
									all_path.push(path);
									res.json({
										status: 'successed',
										data : all_path
									});
								}
								else {
									res.json({
										status: 'fail',
										data : null
									});
								}
							});
						}
						else {
							res.json({
								status: 'successed',
								data : all_path
							});
						}
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
	});
}



exports.sendEmail = function(req,res){
	var student_obj = req.body.student;
	var agent = req.body.agent;
	var send_list =[];
	if(agent) {
		send_list.push(agent.email);
	}
	send_list.push(student_obj.email);
	send_list.push('esc.mailsystem@gmail.com');
	for (var key in constant.EmailStudentTempaleVars) {
		constant.EmailStudentTempaleVars[key] = student_obj[key];
	};

	EmailSender.getEmailTemplate('registerSuccess.html',function(data){
		var context = EmailSender.replaceEmailTemplate(data, constant.EmailStudentTempaleVars);

		var message = "";
		var to = send_list;
		var subject = req.body.subject;
		var context = context;
		var attachments = req.body.attachments;
		EmailSender.sendEmail(to,subject,context,attachments[0], function(message){
			
			res.json(
				{
					returnmessage : message
				});		
		});
	})

}

//Helper function 

function pad(n, width, z) {
  z = z || '0';
  n = n + '';
  return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
}


// exports.sendInvitation = function(req,res){
// 	var agent = req.body.agent;
// 	for (var key in constant.AgentInvitationTemplateVars) {
// 		constant.AgentInvitationTemplateVars[key] = agent[key];
// 	};
// 	constant.AgentInvitationTemplateVars['url'] = 'link';

// 	EmailSender.getEmailTemplate('invitation.html',function(data){
// 		var context = EmailSender.replaceEmailTemplate(data, constant.AgentInvitationTemplateVars);

// 		var message = "";
// 		var to = req.body.email;
// 		var subject = req.body.subject;
// 		var context = context;
// 		var attachments = req.body.attachments;
// 		EmailSender.sendEmail(to,subject,context, function(message){
// 			res.json(
// 				{
// 					returnmessage : message
// 				});		
// 		});
// 	})

// }


















