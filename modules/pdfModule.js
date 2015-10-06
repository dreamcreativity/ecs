var fs = require("fs");
var pdf = require('html-pdf');
var dateFormat = require('dateformat');
var async = require("async");

exports.generatePDF = function (layout,filename, callback) {
	var message ="";
	var path = "./" + filename + ".pdf";

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

exports.getPdfTemplateList = function(listOfTemplateName, callback2) {
	var listOfResult = [];
	async.eachSeries(listOfTemplateName, function (template, callback){
		fs.readFile('./pdfTemplates/' + template, 'utf8', function (err,data) {
		if (err) {
			return console.log(err);
		}
		listOfResult.push(data)
		callback();
	})
	},function(err){
		callback2(listOfResult);
	});
}

exports.replaceTamplateValue = function(templates, studentinfo, accommodation, flightinfo, listofcourse){
	var result =templates[0];
	var studentTemplate = templates[1];
	var courseTemplate = templates[2];
	var accommodationTempate = templates[3];

	//replace value in main template
	for (var key in studentinfo) {
		var replaceValue = studentinfo[key]
		if(typeof studentinfo[key] == "undefined") replaceValue ='N/A';
		result = result.replace("@" + key + "@", replaceValue);
	};

	//replace value in student template 
	for (var key in studentinfo){
		if(studentinfo[key] instanceof Date){
			studentTemplate = studentTemplate.replace("@" + key + "@", dateFormat(studentinfo[key],"mmm dd, yyyy"));
		}
		else if(key == "isHomeCountryAddress"){
			if(studentinfo[key]) studentTemplate = studentTemplate.replace("@" + key + "@", "Home Country");
	 		else studentTemplate = studentTemplate.replace("@" + key + "@", "Canada");
		}
		else {
			var replaceValue = studentinfo[key]
			if(typeof studentinfo[key] == "undefined") replaceValue ='';
			studentTemplate = studentTemplate.replace("@" + key + "@", replaceValue);
		}
	}

	result = result.replace("@studentTemplate@", studentTemplate);

	//replace value in course template
	if(listofcourse){
	var courseTemplateResult = '';
	for (var i=0; i<listofcourse.length; i++){
		var currentCourse = listofcourse[i];
		for (var key in listofcourse[i]){
			if(listofcourse[i][key] instanceof Date){
				courseTemplate = courseTemplate.replace("@" + key + "@", dateFormat(currentCourse[key],"mmm dd, yyyy"));
			}
			else {
				var replaceValue = currentCourse[key]
				if(typeof currentCourse[key] == "undefined") replaceValue ='N/A';
				courseTemplate = courseTemplate.replace("@" + key + "@", replaceValue);
			}
		}
		courseTemplateResult = courseTemplateResult + courseTemplate;
	}

	 result = result.replace("@courseTempates@", courseTemplateResult);
	}
	else if(listofcourse !=null){
		result = result.replace("@courseTempates@", "");
	}

	//replace value in accommodation 
	if(accommodation){
		for(var key in accommodation){
			if(accommodation[key] instanceof Date){
				accommodationTempate = accommodationTempate.replace("@" + key + "@", dateFormat(accommodation[key],"mmm dd, yyyy"));
			}
			else {
				var replaceValue = accommodation[key]
				if(typeof accommodation[key] == "undefined") replaceValue = 'N/A';
				if(replaceValue == true) replaceValue = "Yes";
				else if(replaceValue == false) replaceValue = "No";
				accommodationTempate = accommodationTempate.replace("@" + key + "@", replaceValue);
			}
		}

		for (var key in flightinfo){
			var replaceValue = flightinfo[key];
			accommodationTempate = accommodationTempate.replace("@arrivalDate@", dateFormat(flightinfo["arrivalDate"],"mmm dd, yyyy"));
			accommodationTempate = accommodationTempate.replace("@arrivalTime@", dateFormat(flightinfo["arrivalDate"],"h:MM TT"));
			accommodationTempate = accommodationTempate.replace("@departureDate@", dateFormat(flightinfo["departureDate"],"mmm dd, yyyy"));
			accommodationTempate = accommodationTempate.replace("@departureTime@", dateFormat(flightinfo["departureDate"],"h:MM TT"));
			if(typeof flightinfo[key] == "undefined") replaceValue = 'N/A';
				if(replaceValue == true) replaceValue = "Yes";
				else if(replaceValue == false) replaceValue = "No";
				accommodationTempate = accommodationTempate.replace("@" + key + "@", replaceValue);
		}

		result = result.replace("@accommodationTemplate@", accommodationTempate);
	}

	else result = result.replace("@accommodationTemplate@", '');


	return result;
}

























