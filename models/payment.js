var mongoose = require('mongoose');

var PaymentSchema = new mongoose.Schema({
	paymentType: {type: String},
	paymentMethod : {type: String},
	created : {type : Date,default : Date.now},
	paymentDate : {type : Date},
	amount : {type : Number, min: 0 },
	createBy: { type: mongoose.Schema.ObjectId, ref: 'Staff'},
	createByName : {type:String, default : null},
	isVoid : {type : Boolean, default: false }
});

var Payment = mongoose.model('Payment', PaymentSchema);

module.exports =Payment;