//var jwt = require('jwt-simple');
var User     = require('../models/User');
var jwt        = require("jsonwebtoken");
var secretModule = require('../config/secret');
var config = require('../config');

var auth = {

  login:function(req,res){
    User.findOne({email: req.body.email, password: req.body.password}, function(err, user) {
      if (err) {
        res.json({
          type: false,
          data: "Error occured: " + err
        });
      } else {
        if (user) {
          res.json(user);
        } else {
          res.json({
            type: false,
            data: "Incorrect email/password"
          });
        }
      }
    });
  },

  signup: function(req, res) {
    User.findOne({email:req.body.email, password: req.body.password}, function(err, user) {
      if (err) {
        res.status(401);
        res.json({
          type: false,
          data: "Error occured: " + err
        });
      } else {
        if (user) {
          res.json({
            type: false,
            data: "User already exists!"
          });
        } else {
          var userModel = new User();
          userModel.email = req.body.email;
          userModel.password = req.body.password;
          userModel.save(function(err, user) {
            user.token = jwt.sign(user, config.secret);
            user.save(function(err, user1) {
              res.json(user1);
            });
          })
        }
      }
    });
  },
/*
  validateUser: function(token) {
    User.findOne({token: token})
    function(err, user) {
      if (err) {
        return null;
      } else {
          console.log(user);
        return user;
      }
    });
  }*/
  validateUser: function(token) {
  //  return User.findOne({token: token}).exec()
  }


/*
  User.findOne({username: username}).exec()
  .then(function(user){
    var result = [];
    return Project.findOne({name: project, user_id: user._id}).exec()
      .then(function(project){
        return [user, project];
      });
  })
*/

}

  //private functions
  //

  module.exports = auth;
