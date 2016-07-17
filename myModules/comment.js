var rides = require('./rides');

//constructor
function Comment(author, rideID, message){
	this.id = idCounter;
	idCounter++;
	this.author = author;
	this.rideID = rideID; // parent node
	this.message = message;
	this.time = new Date();
}
var idCounter = 0;

module.exports = {
	init: function(){
		//TODO: get the real idCounter from file
	},
	createComment(req, res){
		// doto: of body is null return error to client

		var a = req.body.author;
		var r = req.body.rideID;
		var d = req.body.message;
		// validate that the data is legal
		if(a.length > 0 && rides.get(r) != null && message.length > 0 && message.length < 120){
			var c = new Comment(a, r, d);
			rides.addComment(c, r);
			res.json(c);
		} else {
			res.json("illegal data");
		}
	}
}