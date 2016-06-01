var jwt = require('jwt-simple');
var validateUser = require('../routes/auth').validateUser;
var User     = require('../models/User');

module.exports = function(req, res, next) {

  // When performing a cross domain request, you will recieve
  // a preflighted request first. This is to check if our the app
  // is safe.

  // We skip the token outh for [OPTIONS] requests.
  //if(req.method == 'OPTIONS') next();

  var token = (req.body && req.body.access_token) || (req.query && req.query.access_token) || req.headers['x-access-token'];
  var key = (req.body && req.body.x_key) || (req.query && req.query.x_key) || req.headers['x-key'];



  if (token || key) {
    try {
      var decoded = jwt.decode(token, require('../config/secret.js')());


      /*
      if (decoded.exp <= Date.now()) {
      res.status(400);
      res.json({
      "status": 400,
      "message": "Token Expired"
    });
    return;
  }*/

  // Authorize the user to see if s/he can access our resources

  //    var dbUser = validateUser(token); // The key would be the logged in user's username



  User.findOne({token: token}, function(err, user) {
    if (err) {
      res.status(401);
      res.json({
        "status": 401,
        "message": "Invalid User"
      });
      return;
    } else {
      if ((req.url.indexOf('admin') >= 0 && user.admin == true) || (req.url.indexOf('admin') < 0 && req.url.indexOf('/api/v1/') >= 0)) {
        next(); // To move to next middleware
      } else {
        res.status(403);
        res.json({
          "status": 403,
          "message": "Not Authorized"
        });
        return;
      }
    }
  });

} catch (err) {
  res.status(500);
  res.json({
    "status": 500,
    "message": "Oops something went wrong",
    "error": err
  });
}
} else {
  res.status(401);
  res.json({
    "status": 401,
    "message": "Invalid Token or Key"
  });
  return;
}
};
