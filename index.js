var app = require('./app.js')


var server = app.listen(2000, function () {

  var host = server.address().address
  var port = server.address().port

  console.log('Example app listening at http://%s:%s', host, port)

})



