var mongoose = require('mongoose');

var MealSchema = new mongoose.Schema({
  text: String,
  calories: Number,
  user_id: String, 
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Meal', MealSchema);
