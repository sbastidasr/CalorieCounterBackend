var User = require('../models/User.js');

var users = {
  getAll: function(req, res, next) {
    User.find(function (err, users) {
      if (err) return next(err);
      res.json(users);
    });
  },

  getOne: function(req, res, next) {
    User.findById(req.params.id, function (err, user) {
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
  }
};

module.exports = users;
