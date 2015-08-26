var jsreport = require('jsreport');
var pdfConfig = {header: "<p>some header</p>",orientation:"portrait",width:"300px",margin :"", format:"A4",};

exports.createPDF = function(req,res) {
  jsreport.render(
  {
    template: {
      content: "<h1>Hello from Page 1</h1><div style='page-break-before: always;'></div><h1>Hello from Page 2</h1><div style='page-break-before: always;''></div><h1>Hello from Page 3</h1>",
      phantom: {
        header: pdfConfig.header,
        orientation: pdfConfig.orientation,
        width: pdfConfig.width
      }
    },
  }).then(function(out) {
    out.stream.pipe(res);
  }).catch(function(e) {    
    res.end(e.message);
  });
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