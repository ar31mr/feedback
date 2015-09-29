var express = require('express');
var app = express();

var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
//var params = require('express-params');


var routes = require('./routes/index');

//var feedback = require('./routes/feedback');
var feedback = require('./api/feedback/feedback');
//var feedback = require('./api/feedback/feedback_was');
//  var test = require('./api/feedback/test');
//  var feedback2 = require('./api/feedback/feedback2');




// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'desktop.bundles')));
//app.use(express.static(path.join(__dirname, 'public')));
//params.extend(app);

//app.param('range', /^(\w+)\.\.(\w+)?$/);
//app.param('id', Number);

app.use('/', routes);
app.use('/api/feedback', feedback);
//app.use('/api/feedback2', feedback2);
//app.use('/api/feedback2/:action', feedback2);
//app.use('/api/feedback/test', test);



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
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
