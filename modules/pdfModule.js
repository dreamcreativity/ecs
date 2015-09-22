var fs = require("fs");
var pdf = require('html-pdf');


// function generatePDF (layout, variables, callback) {
//      var message ="";
//      for(var i=0; i<variables.length; i++){
//       var obj = variables[i];
//       layout = layout.replace( "<% " + Object.keys(obj)[0] + " %>", obj[Object.keys(obj)[0]]);
//      }

//      pdf.create(layout).toFile('./example.pdf', function(err,res){
//       if(err) message = err;
//       else message =  "success";
//       callback(message);
//      })
// }


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

exports.replaceTamplateValue = function(template, data){
	var result =template;
	for(var key in data){
		result = result.replace("@" + key + "@", data[key]);
	}
	return result;
}






















