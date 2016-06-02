var express = require('express');
var router = express.Router();
var auth = require('./auth.js');
var meals = require('./meals.js');
var user = require('./users.js');

/*
 * Routes that can be accessed by any one
 */
router.post('/login', auth.login);
router.post('/signup', auth.signup);

/*
 * Routes that can be accessed only by autheticated users
 */
router.get('/api/v1/meals', meals.getAll);
router.get('/api/v1/meal/:id', meals.getOne);
router.post('/api/v1/meals/', meals.create);
router.put('/api/v1/meal/:id', meals.update);
router.delete('/api/v1/meal/:id', meals.delete);

router.get('/api/v1/user/calculateCaloriesOfDay', user.calculateCaloriesOfDay);
router.get('/api/v1/user/meals', user.getAllMeals);
router.get('/api/v1/user/', user.getCurrentUser); //with token
router.put('/api/v1/user/', user.putCurrentUser); //with token


/* This shouldnt be available to non admins
router.get('/api/v1/user', user.getAll);
router.get('/api/v1/user/:id', user.getOne);
router.post('/api/v1/user/', user.create);
router.put('/api/v1/user/:id', user.update);
router.delete('/api/v1/user/:id', user.delete);
*/
/*
 * Routes that can be accessed only by authenticated & authorized users
 */
router.get('/api/v1/admin/users', user.getAll);
router.get('/api/v1/admin/user/:id', user.getOne);
router.post('/api/v1/admin/users/', user.create);
router.put('/api/v1/admin/user/:id', user.update);
router.delete('/api/v1/admin/user/:id', user.delete);

module.exports = router;
