var Meal = require('../models/Meal.js');

var meals = {
  getAll: function(req, res, next) {
    Meal.find(function (err, meals) {
      if (err) return next(err);
      res.json(meals);
    });
  },
  
  getAllForUserId: function(id, req, res, next) {
    Meal.find({user_id: id},function (err, meals) {
      if (err) return next(err);
      res.json(meals);
    });
  },

  getCalorieCountOfDayForUserId: function(id, req, res, next) {
    Meal.find({user_id: id},function (err, meals) {
      if (err) return next(err);
      var calsOfDay = meals.filter(function(meal){
        var d = new Date()
        console.log(d.toDateString())
        console.log(meal.date.toDateString())
        return (d.toDateString() === meal.date.toDateString());
      })
      .reduce(function(total, meal){
        return total + meal.calories }
        , 0);
        res.json({"calsOfDay":calsOfDay});
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
