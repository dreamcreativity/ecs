var fs = require("fs");
var pdf = require('html-pdf');
var dateFormat = require('dateformat');

exports.generatePDF = function (layout, callback) {
     var message ="";
     var path = "./example.pdf";

     var options = {
		"format": "Letter",        // allowed units: A3, A4, A5, Legal, Letter, Tabloid 
  		"orientation": "portrait",
  		"border": {
		    "top": "5mm",            // default is 0, units: mm, cm, in, px 
		    "right": "10mm",
		    "bottom": "5mm",
		    "left": "10mm"
  		},
  		

     };
     pdf.create(layout,options).toFile(path, function(err,res){
      if(err) message = err;
      else message =  "success";
      callback(message,path);
     });
}


exports.getPdfTemplate = function(templateName, callback){

	fs.readFile('./pdfTemplates/' + templateName, 'utf8', function (err,data) {
	  if (err) {
	    return console.log(err);
	  }
	  callback(data);
	});

}

exports.replaceTamplateValue = function(template, registeration, accommodation, flightinfo, listofcourse){
	var result =template;
	for(var key in registeration){
		if(registeration[key] instanceof Date){
			result = result.replace("@" + key + "@", dateFormat(registeration[key],"mmm dd, yyyy"));
		}
		else if(key == "isHomeCountryAddress"){
			var replaceValue = registeration[key]
			if(registeration[key]){
				replaceValue = "Home Country";
			}
			else replaceValue = "Canada";
			result = result.replace("@" + key + "@", replaceValue);
		}
		else {
			var replaceValue = registeration[key]
			if(typeof registeration[key] == "undefined"){
				replaceValue = '';
			}
			result = result.replace("@" + key + "@", replaceValue);
		}
	}
	return result;
}






















