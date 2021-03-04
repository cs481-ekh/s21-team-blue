var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const RequestIp = require('@supercharge/request-ip');
const { networkInterfaces } = require('os');

var app = express();
var ip;

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '/dist/web-app')));

// Retrieve the client's IP address
app.get('/api/get-client-ip', (req, res) => {
  ip = RequestIp.getClientIp(req).match(/(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)/)[0]; // Parse the module's return string for the actual IP address.
  if(ip) {
    res.json({
      "ip_address" : ip
    })
  } else {
    res.json({
      "ip_address" : "Error: Unable to identify client IP Address"
    })
  }
});

// Run one or more tests and return the TestResults
app.post('/api/run-tests', (req, res) => {
  request = req.body;

  // Grab the IP address and remove it from the array. The shift() method
  // removes the first element of the array and shifts all other elements
  // one index to the left to fill that gap. The array will now only contain 
  // Test IDs.
  ip_address = request.shift(); 

  // 'request' is a string[] of Test IDs. Send this array to the controller,
  // have it loop through each id, run the corresponding test, and return the 
  // results in a TestResults[] in the same order as the Test IDs.
  request.forEach(function(test_id) {
    console.log(test_id); // Testing purposes only; delete on production
  });

  // Get today's date. Delete when results are actually returned from the Python controller.
  today = new Date();
  date = today.getFullYear() + '-' + today.getMonth() + '-' + today.getDay();
  
  // Sample results - Delete when results are actually returned from the Python controller
  results = '[{' +
    '"id" : "1", ' +
    '"test_id" : "7", ' +
    '"description" : "1000 ports scanned, 0 open", ' +
    '"date" : "' + date + '", ' + 
    '"value" : "Success"' +
  '},' + 
  '{' +
    '"id" : "2", ' +
    '"test_id" : "8", ' +
    '"description" : "1001 ports scanned, 0 open", ' +
    '"date" : "' + date + '", ' + 
    '"value" : "Failure"' +
  '}]';
  res.send(JSON.parse(results)); // Return the results of the tests.
});

app.all('/*', function(req, res, next) {
  // Just send the index.html for other files to support HTML5Mode
  res.sendFile('index.html', { root: path.join(__dirname, '/dist/web-app') });
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json({
    message: err.message,
    error: err
  });
});

module.exports = app;
