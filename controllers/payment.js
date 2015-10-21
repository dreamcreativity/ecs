var Registration = require('../models/registration');
var Payment = require('../models/payment');


exports.create = function(req,res){
	var newPayment = new Payment(req.body.payment);
	var registerId = req.body.registerId;
	newPayment.save(function(err, result){
		if(!err){
			Registration.findOne({_id:registerId}, function(err, result1){
				if(!err){
					result1.payments.push(result._id);
					result1.save(function(err, result2){
						if(!err){
							res.json({
								status: 'ok',
								messages: 'successed',
								data: result
							});
						}
					});
				}
			});
		}
		else {
			res.json({
				status: 'fail',
				messages: err,
				data: null
			});
		}
	});
}

exports.edit = function(req,res) {
	var id = req.params.id;
	Payment.update({_id:id}, req.body, function(err, result){
			if(err){
				res.json({
					status: 'fail',
					messages: "fail",
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
