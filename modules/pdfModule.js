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
     pdf.create(layout).toFile(path, function(err,res){
      if(err) message = err;
      else message =  "success";
      callback(message,path);
     });
}
