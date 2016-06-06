var Meal = require('../models/Meal.js');

var meals = {
  getAll: function(req, res, next) {
    Meal.find(function (err, meals) {
      if (err) return next(err);
      res.json(meals);
    });
  },

  getAllForUserId: function(id, req, res, next) {
    var fromDate = new Date(req.query.fromDate*1000);
    var toDate =  req.query.toDate? new Date(req.query.toDate*1000) : new Date('2222-04-11');
    toDate.setDate(toDate.getDate() + 1); //to compensate all day
    var fromTime = req.query.fromTime? new Date(req.query.fromTime*1000) : null;
    var toTime = req.query.toTime? new Date(req.query.toTime*1000): null;

    Meal.find({user_id: id, date: {$gt: fromDate, $lt: toDate}},function (err, meals) {
      if (err) return next(err);
      res.json(filterMeals(meals, fromTime,toTime,res));
    });
  },

  getCalorieCountOfDayForUserId: function(id, req, res, next) {
    Meal.find({user_id: id},function (err, meals) {
      if (err) return next(err);
      var calsOfDay = meals.filter(function(meal){
        var d = new Date()
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

  function filterMeals (meals, fromTime, toTime,res){
    fromTimeHours = fromTime? fromTime.getUTCHours() : 0;
    toTimeHours = toTime ? toTime.getUTCHours() : 24;
    fromTimeMins = fromTime? fromTime.getUTCMinutes() : 0;
    toTimeMins = toTime ? toTime.getUTCMinutes() : 59;

    if(toTime<24){toTime+=1;}
    meals = meals.filter(function(meal){
      return (meal.date.getUTCHours()>=fromTimeHours && meal.date.getUTCHours() <= toTimeHours )
    })
    return meals;
  }
  module.exports = meals;
