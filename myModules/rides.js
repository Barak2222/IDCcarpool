var users = require('./users');

var CONST = {
	today: new Date(),
	tomorrow: (new Date()).setDate((new Date()).getDate() + 1),
	later: (new Date()).setDate((new Date()).getDate() + 2),
}

var ridesData = [
	{
		id: 0,
		author: "Sapir", // user ID
		type: "toIDC",
		role: "driver", // driver or passenger
		date: CONST.today,
		hour: ["12","30"],
		from: "Raanana",
		to: "IDC",
		notes: "best music",
		timeStamp: new Date(), //When this was created
		comments: [],
	},
	{
		id: 1,
		author: "Sivan", // user ID
		type: "toIDC",
		role: "passenger", // driver or passenger
		date: CONST.tomorrow,
		hour: ["08","15"],
		from: "Tel Aviv",
		to: "IDC",
		notes: "best music",
		timeStamp: new Date(), //When this was created
		comments: [],
	},
	{
		id: 2,
		author: "Barak", // user ID
		type: "toIDC",
		role: "passenger", // driver or passenger
		date: CONST.later,
		hour: ["09","00"],
		from: "Tel Aviv",
		to: "IDC",
		notes: "best music",
		timeStamp: new Date(), //When this was created
		comments: [],
	},
	{
		id: 3,
		author: "Sivan", // user ID
		type: "fromIDC",
		role: "driver", // driver or passenger
		date: CONST.today,
		hour: ["08","30"],
		from: "Ramat Gan",
		to: "IDC west gate",
		notes: "cool",
		timeStamp: new Date(), //When this was created
		comments: [],
	},
]

var counter = ridesData.length; //represents ids of rides

function validateRideInput(data){
	return true; // currently everything is supported
}

function create(obj, user){
	var tempDate = obj.date;
	var tempHour = (obj.hour + "").split(":");

	var ride = {
		id: counter,
		author: user,
		type: obj.type,
		role: obj.role, // driver or passenger
		date: tempDate,
		hour: tempHour,// eg ["09","00"],
		from: obj.from,
		to: obj.to,
		notes: obj.notes,
		timeStamp: new Date(),
		comments: [],
	}
	counter++;
	ridesData.push(ride);

	return ridesData[counter-1];
}


module.exports = {
	createRide: function(req, res){
		if (!req.body) return res.sendStatus(400);
		var data = req.body;
		var valid = validateRideInput(data);

		if(valid){
			ride = create(data, req.session.currentUser);
			res.json(ride);
		} else {
			res.json("false");
		}
	},
	find: function(id){
		return ridesData[id];
	},
	getRide: function(req, res){
		var ride = ridesData[req.params.id];
		if(ride){
			res.json(ride);	
		} else{
			res.json("ride wasn't found");
		}
	},
	// this function is used when the page loads
	getFutureData: function(req, res){
		res.json(ridesData);
	},
	addComment: function(comment, rideID){
		ridesData[rideID].comments.push(comment);
	},
	// Get an array of users who currently follow a ride
	getFollowers: function(rideID){
		var ride = this.find(rideID);
		var arr = new Array();
		arr.push(ride.author);
		for (var i = 0; i < ride.comments.length; i++){
			var userID = ride.comments[i].author;
			if(arr.indexOf(userID) == -1){
				arr.push(userID);
			}
		}
		return arr;
	},
	getComments: function(req, res){
		var ride = ridesData[req.params.id];
		if(ride){
			res.json(ride.comments);	
		} else{
			res.json("ride wasn't found");
		}
	}
}