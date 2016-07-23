var rides = require('./../myModules/rides');

var data = {
	Sapir: {
		notSeen: new Array(),
		seen: new Array(),
	},
	Barak: {
		notSeen: new Array(),
		seen: new Array(),
	},
	Sivan: {
		notSeen: new Array(),
		seen: new Array(),
	},
}

// counter represents seenNotification's ID
var counter = 0;

var addNotification = function(follower, rideID, commenter){
	//console.log("addNotification func called");
	//console.log("params: " + follower + ", " + rideID + ", " + commenter);
	if(!data[follower].notSeen[rideID]){
		data[follower].notSeen[rideID] = new Array(); 
	}
	var box = data[follower].notSeen[rideID];

	box.push({"commenter": commenter});
	box[0].lastUpdate = new Date();
}


var notifySeen = function(user, rideID){
	//console.log("notifySeen Func");
	//console.log("params: " + user + ", " + rideID);
	if(!data[user]){
		return ;
	}
	if(!data[user].notSeen[rideID]){
		return ;
	}
	var box = data[user].notSeen[rideID];
	data[user].notSeen[rideID] = null;
	data[user].seen.push({"notificationID": counter, "box": box, "rideID": rideID});
	counter++;
}


module.exports = {
	get: function(req, res){
		res.json(data[req.session.currentUser]);
	},
	notify: function(req, res, next){
		notifySeen(req.session.currentUser, req.params.id);// id is rideID
		next();
	},
	newCommentAdded: function(commenter, rideID){
		var followers = rides.getFollowers(rideID);
		//console.log("followersArr: ");
		//console.log(followers);
		for(var i = 0; i < followers.length; i++){
			if(followers[i] != commenter){
				addNotification(followers[i], rideID, commenter);
			}
		}	
	},
	getCurrentUser: function(req, res){
		res.json(req.session.currentUser);
	},
	userWasCreated: function(userID){
		data[userID] = {
			notSeen: new Array(),
			seen: new Array(),
		}
	}
}