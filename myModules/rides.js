var users = require('./users');
var comment = require('./comment');

var rides = [ // TODO: open from file
	{
		author: "Sapir", // user ID
		type: "toIDC",
		role: "driver", // driver or passenger
		date: new Date(30,8,2017),
		Hour: [12,30],
		from: "Raanana",
		to: "IDC",
		notes: "best music",
		timeStamp: new Date(), //When this was created
		comments: [],
	},
	{
		author: "Sivan", // user ID
		type: "toIDC",
		role: "passenger", // driver or passenger
		date: new Date(31,8,2017),
		Hour: [8,15],
		from: "Tel Aviv",
		to: "IDC",
		notes: "best music",
		timeStamp: new Date(), //When this was created
		comments: [],
	},
]

var counter = rides.length; //represents ids of rides

function validateRideInput(data){
	if(true)// TODO check if the given information validates
		// example: check of date is not in the past
		return true;
	return false;
}

function create(obj){
	// use counter and than do counter++
	// than push new user to the rides array
	// TODO
}

var rides = {
	createRide: function(req, res){
		if (!req.body) return res.sendStatus(400);
		var data = req.body;
		var valid = validateRideInput(data);

		if(valid){
			create(u);
			res.json("true");
		} else {
			res.json("false");
		}
	},
	getRide: function(req, res){
		var ride = rides[req.params.id];
		if(ride){
			res.json(ride);	
		}
		 res.status(402).json("ride wasn't found");
		 //TODO check the statuscode
	},
	// this function is used when the page loads
	getFutureData: function(){
		// TODO: return all the data about future rides
		// do not return comments data
	},
	addComment: function(comment, rideID){
		rides[rideID].comments.push(comment);
	}
}

module.exports = rides;