var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const RequestIp = require('@supercharge/request-ip');

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
    });
  } else {
    res.json({
      "ip_address" : "Error: Unable to identify client IP Address"
    });
  }
});

app.get('/api/get-test-list', (req, res) => {
  list = "";
  error = "";
  var spawn = require('child_process').spawn;
  proc = spawn('python3', ['../controller/main.py', '--list'])
  proc.stdout.on('data', function(data) {
    list = JSON.parse(data);
  });
  proc.stderr.on('data', function(data) {
    error += data.toString();
  });
  proc.on('close', function(exitCode) {
    if(error != "") {
      res.statusCode = 500;
      res.send(error);
    } else {
      res.send(list);
    }
  });
});

// Run one or more tests and return the TestResults
app.post('/api/run-tests', (req, res) => {
  request = req.body;

  // Grab the IP address and remove it from the array. The shift() method
  // removes the first element of the array and shifts all other elements
  // one index to the left to fill that gap. The array will now only contain 
  // Test IDs.
  ip_address = request.shift(); 
  
  results = "";
  error = "";
  var spawn = require('child_process').spawn;
  proc = spawn('python3', ['../controller/main.py', '--ip', ip_address, request]);
  proc.stdout.on('data', function(data) {
    results = JSON.parse(data);
  });
  proc.stderr.on('data', function(data) {
    error += data.toString();
  });
  proc.on('close', function(exitCode) {
    if(error != "") {
      res.statusCode = 500;
      res.send(error);
    } else {
      res.send(results);
    }
  });
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
