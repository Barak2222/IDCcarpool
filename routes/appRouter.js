var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var parseUrlencoded = bodyParser.urlencoded({extended: false});


var auth = require('./../myModules/authentication');
var users = require('./../myModules/users');
var rides = require('./../myModules/rides');
var comments = require('./../myModules/comment');

router.use(auth.middleAuth)

.get('/logout', auth.logout)
.get('/profile/:id', users.getProfile)
.post('/createRide', parseUrlencoded, rides.createRide)
.get('/getRide/:id', rides.getRide)
.get('/futureRides', rides.getFutureData)
.post('/CreateNewComment', parseUrlencoded, comments.createComment)
.use('/', express.static(__dirname + "\\..\\" + 'www\\'));

module.exports = router;