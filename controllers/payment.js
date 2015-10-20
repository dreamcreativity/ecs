var Registration = require('../models/registration');
var Payment = require('../models/payment');


exports.create = function(req,res){
	var newPayment = new Payment(req.body);
	newPayment.save(function(err, result){
		if(!err){
			res.json({
				type:true,
				data:result
			});
		}
	});
}
