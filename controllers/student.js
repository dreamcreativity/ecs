var Student = require('../models/student');
var Counter = require('../models/counter');
var Staff = require('../models/staff');
var Token = require('../models/token');
var AgentInvitation = require('../models/agentInvitation');
var Agent = require('../models/agent');
var Accommodation = require('../models/accommodation');
var FlightInfo = require('../models/flightInfo');
var ProgramRegistration = require('../models/programRegistration')
var Registration = require('../models/registration');
var EmailSender = require('../modules/emailModule');
var Payment = require('../models/payment');
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
	var studentNumber = null;
	var agentEmail = null;
	var agentId =req.body.agent;
	var accommodation = new Accommodation(req.body.accommodation);
	var flightInfo = new FlightInfo(req.body.flightInfo);
	var programs = req.body.courseList; 
	var registration = new Registration();
		registration.agent = student.agent;

	async.waterfall([
		function(callback){
			if(token){
				AgentInvitation.findOne({_id:token}, function(err, result){
						if(!err){				 					
							student.agent = result.agent;
							agentId = result.agent;
				 			callback();
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
					if(agentId) {
					registration.commissionRate = agent.commission;
					}
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
							studentNumber = result.studentID;
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
						data: result,
						studentId : studentNumber,
						agentEmail : agent.email
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
		Payment.populate(result, {
			path: 'payments.createBy',
			model: 'Staff'
		},
		function(err, staff) {
			if(err) return callback(err);
			console.log(staff[0]);
			res.json({
				status : 'ok',
				messages : 'successed',
				data : staff[0]
			});
		});
	});
}

//Update: Registeration record 
exports.updateRegistration = function(req,res){
	var id = req.params.id;
	var programs = req.body.courseList; 
	var programRegistration_ids = [];
	async.each(programs, function(item,callback){
		var obj = new ProgramRegistration(item);
		obj.price = item.duration.price;
		obj.coursePeriod = item.duration.title;
		if(agentId) {
			obj.commissionRate = agent.commission;
		}
		obj.save(function(err,result){
			if(err){
				callback2
			}
			else {
				programRegistration_ids.push(result._id);
				callback()
			}
		});
	},function(err){
			ProgramRegistration.update({_id:id}, {programRegistration : programRegistration_ids},function(err, result){
				if(!err){
					res.json({
						status : 'ok',
						messages : 'successed',
						data : result
					});
				}
			});
		});		
}


//GET: Recent 10 Registration records for staff site
exports.getRegistrations = function(req,res){
	Registration.find().sort({'createDate' : -1}).limit(10).populate('student').exec(function(err, result){
		if(err){
			res.json({
				status : 'fail',
				messages : err,
				data : null
			});
		}
		else {
			res.json({
				status : 'ok',
				messages : 'successed',
				data : result
			});
		}
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

//PUT: Edit by Agent
exports.editByAgent = function(req,res){
	var id = req.params.id;
	var student = new Student(req.body);
	Student.update({_id:id}, 
	{
		firstname : student.firstname,
		lastname : student.lastname,
		region : student.region,
		address : student.address,
		postcode : student.postcode,
		city : student.city,
		province : student.province,
		country : student.country,
		telephone : student.telephone,
		fax : student.fax,
		email : student.email,
		emergency : student.emergency,
		country : student.country
	}, function(err, result){
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
	var accommodation = new Accommodation(req.body.accommodation);
	var flightInfo = new FlightInfo(req.body.flightInfo);
	var studentId = req.body.studentId;
	var accommodation_id = null;
	var flightInfo_id = null;
	if(accommodation){
		accommodation.save(function(err, result){
			if(!err){
				accommodation_id = result._id;
				if(flightInfo){
					flightInfo.save(function(err, result1){
						if(!err){
							flightInfo_id =result1._id;
							Student.findOne({_id:studentId}).exec(function(err, result2){
								if(!err){
									result2.accommodation = accommodation_id;
									result2.flightInfo = flightInfo_id;
									result2.save(function(err, result3){
										if(!err){
											res.json({
												status: 'ok',
												messages: 'successed',
												data: result3
											});
										}
									});
								}
							});
						}
					});
				}
			}
		});
	}
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

exports.updateFlightInfo = function(req,res){
	var id = req.params.id;
	FlightInfo.update({_id:id}, req.body, function(err, result){
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
							if(agent !=null) {
								registration.commissionRate = agent.commission;
								}
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
	var id = req.body.studentId;
	var register_id = req.body.registerId;
	var Obj =Student;
	if(!id) {
		id = register_id;
		Obj = Registration;
	}
	var type = req.body.type;
	var variables_list = [];
	Obj.findOne({_id : id}).populate('agent').populate('accommodation').populate('programRegistration').populate('flightInfo').populate('student').exec(function(err, result){
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
			if(register_id) {
				student_obj = student_obj.student;
			}
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
					duration : item.coursePeriod
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
	var studentNumber = req.body.studentNumber;
	var agent = req.body.agent;
	var region = req.body.region;
	var attachments = req.body.attachments;
	var send_staff_list =[];
	var send_agent_list =[];
	if(agent) {
		send_agent_list.push(agent);
	}
	//send_list.push(student_obj.email);
	//send_staff_list.push('esc.mailsys@gmail.com');
	for (var key in constant.EmailStudentTempaleVars) {
		constant.EmailStudentTempaleVars[key] = student_obj[key];
		constant.EmailStudentTempaleNotifyStaffVars[key] = student_obj[key];
		constant.EmailStudentTempaleNotifyAgentVars[key] = student_obj[key];
	};
	constant.EmailStudentTempaleVars["studentID"] = studentNumber;
	constant.EmailStudentTempaleNotifyStaffVars["studentID"] = studentNumber;
	constant.EmailStudentTempaleNotifyAgentVars["studentID"] = studentNumber;
	constant.EmailStudentTempaleNotifyStaffVars['url'] = "http://" + req.headers.host + "/staff/login";
	constant.EmailStudentTempaleNotifyAgentVars['url'] = "http://" + req.headers.host + "/agent/login";

	async.waterfall([
		function(callback){
			if(region){
				Staff.find({regions : region},function(err, result){
					if(!err && result.length > 0){
						for (var i = 0; i < result.length; i++) {
							send_staff_list.push(result[i].email);
						};
						callback();
					}
				});
			}
			else callback();
		},
		function(callback){
			EmailSender.getEmailTemplate('registerSuccess.html',function(data){
			var context = EmailSender.replaceEmailTemplate(data, constant.EmailStudentTempaleVars);
			var message = "";
			var to = student_obj.email;
			var subject = req.body.subject;
			var context = context;
			var attachments = req.body.attachments;
			EmailSender.sendEmail(to,subject,context,attachments[0], function(message){
				callback();
			});
		})
		},
		function(callback){
			EmailSender.getEmailTemplate('registerSuccessNotifyStaff.html',function(data){
			var context = EmailSender.replaceEmailTemplate(data, constant.EmailStudentTempaleNotifyStaffVars);
			var message = "";
			var to = send_staff_list;
			var subject = req.body.subject;
			var context = context;
			var attachments = req.body.attachments;
			EmailSender.sendEmail(to,subject,context,attachments[0], function(message){
				callback();
			});
		})
		},
		function(callback){
			EmailSender.getEmailTemplate('registerSuccessNotifyAgent.html',function(data){
			var context = EmailSender.replaceEmailTemplate(data, constant.EmailStudentTempaleNotifyAgentVars);
			var message = "";
			var to = send_agent_list;
			var subject = req.body.subject;
			var context = context;
			var attachments = req.body.attachments;
			EmailSender.sendEmail(to,subject,context,attachments[0], function(message){
				callback();
			});
		})
		}
		],function(err, result){
			EmailSender.deleteAttachments(attachments[0]);
			if(!err){
				res.json(
	 			{
	 				returnmessage : "successed"
	 			});		
			}
		});
}

//Send Email form in client site
exports.client_sendEmail = function(req,res){
	var messageForm = req.body.messageForm;
	for (var key in constant.ClientMessageFormVars) {
		constant.ClientMessageFormVars[key] = messageForm[key];
	};

	EmailSender.getEmailTemplate('clientMessageForm.html', function(data){
		var context = EmailSender.replaceEmailTemplate(data, constant.ClientMessageFormVars);
		var to = constant.SchoolInfoEmails
		var subject = 'Send us an Email';
		var attachment = [];
		EmailSender.sendEmail(to,subject,context,attachment, function(message){
			res.json(
				{
					returnmessage : message
				});		
		});
	})
}



//Get Program by program id 
exports.getProgramRegister = function(req,res){
	var id = req.params.id;
	ProgramRegistration.find({_id:id}, function(err, result){
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
			data: result[0]
		});
	});
}

//Update Program Register 
exports.updateProgramRegister = function(req,res){
	 var id = req.params.id;
	 var course = req.body.course;
	 ProgramRegistration.findOne({_id:id},function(err, result){
	 	if(!err){
	 		result.tag = course.tag;
			result.title = course.title;
			result.course = course.course;
			result.level = course.level;
			result.startDate = course.startDate;
			result.duration = course.duration;
			result.isDelete = course.isDelete;
			ProgramRegistration.update({_id:id}, result, function(err, result){
			if(err){
				res.json({
					status: 'fail',
					messages: err,
					data: null
				});
			}else{
				res.json({
					status: 'ok',
					messages: 'successed',
					data: result[0]
				});	
			}
		});

	 	}
	 });
}

//Helper function 
function pad(n, width, z) {
  z = z || '0';
  n = n + '';
  return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
}



















