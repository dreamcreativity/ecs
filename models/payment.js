var mongoose = require('mongoose');

var PaymentSchema = new mongoose.Schema({
	paymentType: {type: String},
	paymentMethod : {type: String},
	created : {type : Date},
	paymentDate : {type : Date},
	amount : {type : Number, min: 0 },
	createBy: { type: Schema.Types.ObjectId, ref: 'Staff'},
	isVoid : {type : Boolean, default: false }
});

var Payment = mongoose.model('Payment', PaymentSchema);

module.exports =Payment;