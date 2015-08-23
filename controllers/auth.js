var mongoose = require('mongoose');
var Token = require('../models/token');
var Staff = require('../models/staff');
var Agent = require('../models/agent');
var fs = require('fs');
var SHA256 = require("crypto-js/sha256");
var moment = require('moment');


// Insert a new Slider record
exports.IsTokenValid = function(AccessToken, callBack){

	Token.find({_id:AccessToken, isActived:true}, function(err,result){
		if(err){
			console.log('--------  IsTokenValid()  Error ---------');
			console.log(AccessToken);
			console.log(err);

			callBack(false);
		}else{
			if(result.length != 1)
				//return false;
				callBack(false);
			else{
				var tokenObj = result[0];
				callBack(true);
			}
		}
	});
}

exports.IsTokenValidForInActivedUser = function(AccessToken, callBack){

	Token.find({_id:AccessToken, isActived:false}, function(err,result){
		if(err){
			console.log('--------  IsTokenValidForInActivedUser()  Error ---------');
			console.log(AccessToken);
			console.log(err);

			callBack(false);
		}else{
			if(result.length != 1)
				//return false;
				callBack(false);
			else{
				var tokenObj = result[0];
				callBack(true);
			}
		}
	});
}

