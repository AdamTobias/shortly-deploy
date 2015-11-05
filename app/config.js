var path = require('path');
var mongoose = require('mongoose');


mongoose.connect('mongodb://localhost/test');

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', function(callback){console.log('Database opened');});

module.exports.userSchema = mongoose.Schema({
  username: String,
  password: String
});

module.exports.urlSchema = mongoose.Schema({
  url: String,
  base_url: String,
  code: {type: String, default: ''},
  title: String,
  visits: {type: Number, default: 0}
});
