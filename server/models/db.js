var mongoose = require('mongoose');

// Set Mongo URI
var dbURI = 'mongodb://localhost/test-site';
if (process.env.NODE_ENV === 'production') {
  dbURI = process.env.MONGOLAB_URI;
}

// Connect to Mongo
mongoose.connect(dbURI);

// Connection events
mongoose.connection.on('connected', function() {
  console.log('Mongoose connected to ' + dbURI);
});
mongoose.connection.on('error', function(err) {
  console.log('Mongoose connection error: ' + err);
});
mongoose.connection.on('disconnected', function() {
  console.log('Mongoose disconnected');
});

// Load User model
require('./users');

