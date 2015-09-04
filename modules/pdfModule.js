var fs = require("fs");
var pdf = require('html-pdf');

// exports.createPDF = function(req,res) {
//   var content = "";
//   generatePDF("<p><% Firstname %></p><p><% Lastname %></p><p><% Gender %></p><p><% From %></p>", 
//               [{'Firstname' : 'Cheng'},{'Lastname' : 'Sun'},{'Gender' : 'Male'},{'From' : 'China'}], function(message){
//                content = message
//               console.log(content);
//             });
// }


function generatePDF (layout, variables, callback) {
     var message ="";
     for(var i=0; i<variables.length; i++){
      var obj = variables[i];
      layout = layout.replace( "<% " + Object.keys(obj)[0] + " %>", obj[Object.keys(obj)[0]]);
     }

     pdf.create(layout).toFile('./example.pdf', function(err,res){
      if(err) message = err;
      else message =  "success";
      callback(message);
     })
}

//Page break : <div style='page-break-before: always;'>
/*
margin - px or cm specification of margin used from page borders
format- predefined page sizes containing A3, A4, A5, Legal, Letter
width - px or cm page width, takes precedence over paper format
height - px or cm page height, takes precedence over paper format
orientation - portrait or landscape orientation
headerHeight - px or cm height of the header in the page
header- header html content
footerHeight - px or cm height of the footer in the page
footer - footer html content
printDelay - delay between rendering a page and printing into pdf, this is useful when printing animated content like charts
blockJavaScript - block executing javascript
*/