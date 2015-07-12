var mongoose = require('mongoose');
var Token = require('../models/token');
var Staff = require('../models/staff');
var Agent = require('../models/agent');
var fs = require('fs');
var SHA256 = require("crypto-js/sha256");
var moment = require('moment');


// Insert a new Slider record
exports.IsTokenValid = function(AccessToken, callBack){

	Token.find({_id:AccessToken}, function(err,result){
		if(err){
			console.log('-------- Error ---------');
			console.log(AccessToken);
			console.log(err);
			//return false;
			callBack(false);
		}else{
			console.log('-------- Result ---------');
			console.log(result);

			if(result.length != 1)
				//return false;
				callBack(false);

			var tokenObj = result[0];

			// check exprie time

			//console.log(tokenObj.created);

			//return true;
			callBack(true);
		
		}
	});
}


// exports.Login = function(username, password, accountType){

// 	if( accountType == 'Staff' ){

// 		Staff.findOne({username : username, password: SHA256(password) }, function(err, user){
// 			if(err){
// 				return '';
// 			}
// 			else {
// 				if(user == null){
// 					return '';
// 				}else {
// 					console.log('---------- user record found ----------');
// 					console.log(user);

					
// 				}
// 			}
// 		});

// 	}else{

// 	}

// }