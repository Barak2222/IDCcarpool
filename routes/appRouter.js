var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var parseUrlencoded = bodyParser.urlencoded({extended: false});


var auth = require('./../myModules/authentication');
var users = require('./../myModules/users');
var rides = require('./../myModules/rides');
var comments = require('./../myModules/comment');
var notifications = require('./../myModules/notifications');

router.use(auth.middleAuth)
.get('/getCurrentUser', auth.getCurrentUser)
.get('/logout', auth.logout)
.get('/profile/:id', users.getProfile) // delete this
.post('/createRide', parseUrlencoded, rides.createRide)
.get('/getRide/:id', notifications.notify, rides.getRide)
.get('/getComments/:id', rides.getComments)
.get('/notifications', notifications.get)
.get('/notifications/notify/:id', notifications.notify, notifications.sendOk)
.get('/futureRides', rides.getFutureData)
.post('/CreateNewComment', parseUrlencoded, comments.createComment)
.use('/', express.static(__dirname + "\\..\\" + 'www\\'));

module.exports = router;