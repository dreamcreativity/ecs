var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');





//---------------------------------------------
// Database 
//---------------------------------------------
var db = require('./db');


//---------------------------------------------
//  setup routing files
//---------------------------------------------
var routes = require('./routes/client');
var admin = require('./routes/admin');
var agent = require('./routes/agent');
var api = require('./routes/api');

//---------------------------------------------
// create express object
//---------------------------------------------
var app = express();


//---------------------------------------------
// view engine setup
//---------------------------------------------
app.set('views', path.join(__dirname, 'views'));
//app.set('view engine', 'jade');
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');


//---------------------------------------------
//  create multer for file upload
//---------------------------------------------
var multer  = require('multer');
var done=false;

app.use(multer({
  dest: './uploads/',
  rename: function (fieldname, filename) {
    return filename.replace(/\W+/g, '-').toLowerCase() + Date.now()
  }
}));



// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());


//---------------------------------------------
// setup the static folder for files
//---------------------------------------------
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/admin', admin);
app.use('/agent', agent);
app.use('/api', api);


//---------------------------------------------
// catch 404 and forward to error handler
//---------------------------------------------
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers
//---------------------------------------------
// development error handler
// will print stacktrace
//---------------------------------------------
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
