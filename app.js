var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var WindowsAzure= require('azure');

var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();

var config = require('./config');
var https = require('https');


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);

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

// require('cylon').robot({
//     work: function (my) {
//         //send messages every 4 seconds...
//         every((4).second(), function () {
//             postData();
//         });
//     }
// }).start();
// function postData() {

//     var user = {
//         firstName: 'Heather',
//         lastName: 'Shapiro',
//         score: 30
//     };

//     var userString = JSON.stringify(user);

//     var headers = {
//         'Accept': "application/json",
//         'Content-Type': 'application/json',
//         'Content-Length': userString.length,
//         'X-ZUMO-APPLICATION': config.appkey
//     };

//     var options = {
//         host: config.mobileservices + '.azure-mobile.net',
//         port: 443,
//         path: '/tables/' + config.table,
//         method: 'POST',
//         headers: headers
//     };

//     // Setup the request.  The options parameter is
//     // the object we defined above.
//     var req = https.request(options, function (res) {
//         res.setEncoding('utf-8');

//         var responseString = '';

//         res.on('data', function (data) {
//             responseString += data;
//         });

//         res.on('end', function () {
//             var resultObject = JSON.parse(responseString);
//         });
//     });

//     req.on('error', function (e) {
//         // TODO: handle error.
//     });

//     req.write(userString);
//     req.end();
// }
