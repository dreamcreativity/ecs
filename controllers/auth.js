var mongoose = require('mongoose');
var Token = require('../models/token');
var Staff = require('../models/staff');
var Agent = require('../models/agent');
var fs = require('fs');
var SHA256 = require("crypto-js/sha256");
var moment = require('moment');


// Insert a new Slider record
exports.IsTokenValid = function(AccessToken,accessReferer,callBack){

	Token.find({_id:AccessToken, isActived:true}, function(err,result){
		if(err){
			console.log('--------  IsTokenValid()  Error ---------');
			console.log(AccessToken);
			console.log(err);
			callBack(false);
		}else{
			console.log('--------  IsTokenValid()  Error ---------');
			if(err) {
				console.log(err)
				callBack(false);
			}
			else {

				console.log(result);
				if(result.length != 1) callBack(false);
				else {
					var type = result[0].type;
					var matchUrl = null;
					if(type == 'Staff') matchUrl = 'admin'
					else if(type =='Agent') matchUrl = 'agent'
					var res = accessReferer.split('/');
					if(res.indexOf(matchUrl) > -1){
						callBack(true);
					}
					else callBack(false);
				}
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

