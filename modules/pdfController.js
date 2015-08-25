PDFDocument = require('pdfkit');
var Registration = require('../models/registration');
var RegistrationController = require('../controllers/registration');
var fs = require('fs');

// exports.createPDF = function(req,res){

//  var doc = new PDFDocument();
//  var text = 'ANY_TEXT_YOU_WANT_TO_WRITE_IN_PDF_DOC';
//  doc.pipe(fs.createWriteStream('out.pdf'));  //creating a write stream 
//             //to write the content on the file system
// doc.text(text, 100, 100);             //adding the text to be written, 
//             // more things can be added here including new pages
// doc.end(); //we end the document writing.
// console.log("create a out.pdf")
// }

exports.createPDF = function(req,res) {
   var id = req.params.id;
   var obj = RegistrationController.get(id);
   var RegistrationObj = new Registration(obj);

    var doc = new PDFDocument();
    var text = RegistrationObj.lastname + " " + RegistrationObj.firstname; 
    doc.pipe(fs.createWriteStream('out.pdf'));  //creating a write stream 
            //to write the content on the file system
   doc.text(text, 100, 100);             //adding the text to be written, 
            // more things can be added here including new pages
   doc.end(); //we end the document writing.
   console.log("create a out.pdf")

}