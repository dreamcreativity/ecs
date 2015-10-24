var mongoose = require('mongoose');
// var Token = require('../models/token');
// var Staff = require('../models/staff');
// var Agent = require('../models/agent');
// var Student = require('../models/student');

var Registration = require('../models/registration');
var async = require("async");


// var fs = require('fs');
// var SHA256 = require("crypto-js/sha256");
var moment = require('moment');


// Insert a new Slider record
exports.getCommissionByAgentId = function(req,res){


	var agentId = req.body.agentId;
	console.log('---------');
	console.log(req.body);


	// find commission by agent Id

	Registration.find({agent: agentId}).populate('payments').populate('student').exec(function(err, registrations){

		var payementList = [];

		async.each(registrations, function(registration, next){
		    
			//payementList = payementList.concat(registration.payments);

			async.each(registration.payments, function(payment, next){

				payementList.push({
					student: registration.student,
					payment: payment,
					registration : registration

				});

				next();

			},function(err){

			});



			next();
		},function(err){
			// All tasks are done now
			//console.log(payementList);

			if(err){
				res.json({
					status: 'fail',
					messages: 'err',
					data: null
				});	
			}else{
				res.json({
					status: 'ok',
					messages: 'successed',
					data: payementList
				});				
			}

			
		});


	});
	
}


