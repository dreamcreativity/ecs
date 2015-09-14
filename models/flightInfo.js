var mongoose = require('mongoose');

var FlightInfoSchema = mongoose.model('FlightInfo', new mongoose.Schema({
	arrivalDateTime:{type: Date},
	arrivalAirline : {type:String},
	isPickup : {type:Boolean, default:false},
	departureDateTime:{type: Date},
	departureAirline : {type:String},
	isDropoff : {type:Boolean, default:false}，
	students : [{type : mongoose.Schema.ObjectId, ref:'Student', default:null}],
}));

var FlightInfo = mongoose.model('FlightInfo', FlightInfoSchema);

module.exports =FlightInfo;