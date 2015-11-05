var request = require('request');
var crypto = require('crypto');
var bcrypt = require('bcrypt-nodejs');
var util = require('../lib/utility');
var promisify = require('bluebird').promisify;

var db = require('../app/config');
var Users = require('../app/models/user');
var Links = require('../app/models/link');

exports.renderIndex = function(req, res) {
  res.render('index');
};

exports.signupUserForm = function(req, res) {
  res.render('signup');
};

exports.loginUserForm = function(req, res) {
  res.render('login');
};

exports.logoutUser = function(req, res) {
  req.session.destroy(function() {
    res.redirect('/login');
  });
};

exports.fetchLinks = function(req, res) {
  Links.find(function(err, links) {
    res.send(200, links);
  }) 
};

exports.saveLink = function(req, res) {
  var uri = req.body.url;

  if (!util.isValidUrl(uri)) {
    return res.send(404);
  }

  Links.find({url : uri}, function (err, finds) {
    if (finds.length) {
      res.send(200, 'todo');
    } else {
      util.getUrlTitle(uri, function(err, title) {
        if (err) {
          return res.send(404);
        }
        Links.create({
          url: uri,
          title: title,
          base_url: req.headers.origin
        })
        .then(function(newLink){
          res.send(200, newLink);
        })
      });
    }
  })
};

exports.loginUser = function(req, res) {
  var username = req.body.username;
  var password = req.body.password;

  Users.find({username: username}, function(err, user){
    if(!user.length) {
      res.redirect('/login');
    } else {
      user[0].comparePassword(password, function (match) {
        if (match) {
          util.createSession(req, res, user);
        } else {
          res.redirect('/login');
        }
      })
    }
  })
};

exports.signupUser = function(req, res) {
  var username = req.body.username;
  var password = req.body.password;

  Users.find({username: username}, function (err, user) {
    if (!user.length) {
      Users.create({username:username, password:password})
        .then(function(newUser) {
          util.createSession(req, res, newUser);
        });
    } else {
      res.redirect('/signup');
    }
  });
};

exports.navToLink = function(req, res) {
  Links.find({code: req.params[0]}, function(err, finds){
      var link = finds[0];

      if (!link) {
        res.redirect('/');
      } else {
        link.visits = link.visits + 1;
        promisify(link.save).call(link)
          .then(function () {
            res.redirect(link.url);
          })
      }
    })
};