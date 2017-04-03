var mongoose = require('mongoose');
var keyRecord = require('../models/keyRecord');
var Keyword = require('../models/keyword');
var async = require("async");
var constant = require('../constants.js');



exports.addRecord = function(req,res){

	console.log(req.body);

	var type = req.body.type;
	var key  = req.body.key;


	if( typeof type === 'undefined' || typeof key === 'undefined' || key == '' || type =='' ){

		res.json({
			status: 'error',
			messages: 'invaild message format'
		});

	}else{
		keyRecord.findOne({'key':key, 'type': type}, function(err, record){
			if(record == null){
				// create new record is not exist
				var newRecord = new keyRecord({
					'key': key,
					'type': type,
					'exist': false
				});



				async.series([
				    function(callback){

				    	Keyword.find({'value': key, 'type': type}, function(err, result){

				    		if(result.length > 0)
				    			newRecord.exist = true;
				    		
				    		callback();
				    	});
				    	
				    },
				    function(callback){
						newRecord.save(function(err, result){
							if(err){
								res.json({
									status: 'error',
									data: err
								});	
							}else{
								res.json({
									status: 'ok',
									data: result
								});	
							}
								
						});
				    }
				]);

			}else{
				record.count++;
				record.save(function(err, result){
					res.json({
						status: 'ok',
						data: result
					});	
				});
			}
		});
	}
}

exports.getRecords = function(req,res){

	keyRecord.find({exist:true}).sort('-count').exec(function(err, docs) { 

		console.log(docs);

		res.json({
			status: 'ok',
			data: docs
		});	
	});

}