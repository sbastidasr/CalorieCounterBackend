var Meal = require('../models/Meal.js');

var meals = {
  getAll: function(req, res, next) {
    Meal.find(function (err, meals) {
      if (err) return next(err);
      res.json(meals);
    });
  },

  getOne: function(req, res, next) {
    Meal.findById(req.params.id, function (err, meal) {
      if (err) return next(err);
      res.json(meal);
    });
  },

  create: function(req, res, next) {
    Meal.create(req.body, function (err, meal) {
      if (err) return next(err);
      res.json(meal);
    });
  },

  update: function(req, res, next) {
    Meal.findByIdAndUpdate(req.params.id, req.body, function (err, meal) {
      if (err) return next(err);
      res.json(meal);
    });
  },

  delete: function(req, res, next) {
    Meal.findByIdAndRemove(req.params.id, req.body, function (err, meal) {
      if (err) return next(err);
      res.json(meal);
    });
  }
};

module.exports = meals;
