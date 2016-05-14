/******************************************************************
						TEST APP 1.0.0 beta
******************************************************************/

var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var bodyParser = require('body-parser');
var passport = require('passport');

require('./server/models/db');
require('./server/config/passport');	

var routesApi = require('./server/routes/index');
var adminApi = require('./server/admin/routes/index');

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, 'public')));
app.use('/admin', express.static(path.join(__dirname, 'admin')));

// Initialise Passport before using the route middleware
app.use(passport.initialize());

// Use the API routes when path starts with /api
app.use('/api', routesApi);

// Otherwise render the index.html page for the Angular SPA
// This means we don't have to map all of the SPA routes in Express
app.use(function(req, res) {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});


// error handlers
// Catch unauthorised errors
app.use(function (err, req, res, next) {
  if (err.name === 'UnauthorizedError') {
    res.status(401);
    res.json({"message" : err.name + ": " + err.message});
  }
});

// Launch server
app.listen(3000, function() {
	console.log("Test site running on port 3000");
});