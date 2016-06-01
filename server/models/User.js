var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var UserSchema   = new Schema({
    email: String,
    password: String,
    token: String,
    admin: { type: Boolean, default: false },
    expectedCalories: { type: Number, default: 0 },
});

module.exports = mongoose.model('User', UserSchema);
