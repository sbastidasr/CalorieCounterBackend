var User = require('../models/User.js');
var jwt = require('jwt-simple');
var meals = require('./meals.js');

var users = {
  getAll: function(req, res, next) {
    User.find(function (err, users) {
      if (err) return next(err);
      res.json(users);
    });
  },

  getOne: function(req, res, next) {
    User.findById(req.params.id||token, function (err, user) {
      if (err) return next(err);
      res.json(user);
    });
  },

  create: function(req, res, next) {
    User.create(req.body, function (err, user) {
      if (err) return next(err);
      res.json(user);
    });
  },

  update: function(req, res, next) {
    User.findByIdAndUpdate(req.params.id, req.body, function (err, user) {
      if (err) return next(err);
      res.json(user);
    });
  },

  delete: function(req, res, next) {
    User.findByIdAndRemove(req.params.id, req.body, function (err, user) {
      if (err) return next(err);
      res.json(user);
    });
  },

  calculateCaloriesOfDay:function(req,res,next) {
    getCurrentUserFromToken(req, function(err, user){
      meals.getCalorieCountOfDayForUserId(user.id, req, res, next);
    });
  },

  getAllMeals:function(req,res,next) {
    getCurrentUserFromToken(req, function(err, user){
      meals.getAllForUserId(user.id, req, res, next);
    });
  },
  getCurrentUser:function(req,res,next) {
    getCurrentUserFromToken(req, function(err, user){
      res.json(user);
    });
  },
  putCurrentUser:function(req,res,next) {
    getCurrentUserFromToken(req, function(err, user){
      req.params.id = user.id;
      users.update(req,res,next);
    });
  }

}

//privates
function getToken(req){
  var token = (req.body && req.body.access_token) || (req.query && req.query.access_token) || req.headers['x-access-token'];
  if (token) {
    try {
      var decoded = jwt.decode(token, require('../config/secret.js')());
      if(decoded){
        return token;
      }
    } catch (err) {
      return null;
    }
  }
}

//private
function getCurrentUserFromToken(req,cb) {
  var token = getToken(req);
  if (token) {
    console.log("token: "+token)
    User.findOne({token: token}, function(err, user) {
      cb(err, user);
    });
  }
}

module.exports = users;
