var rides = require('./rides');

//constructor
function Comment(author, rideID, message){
	this.author = author;
	this.rideID = rideID; // parent node
	this.message = message;
	this.time = new Date();
}

module.exports = {
	init: function(){
		//TODO: get the real idCounter from file
	},
	createComment(req, res){
		// doto: of body is null return error to client

		var author = req.session.currentUser;
		var rideID = req.body.rideID;
		var message = req.body.message;
		var author = req.session.currentUser;
		// validate that the data is legal
		if(/**(rides.find(rideID)) &&*/ message.length > 0 && message.length < 120){
			var commentObj = new Comment(author, rideID, message);
			rides.addComment(commentObj, rideID);
			res.json(commentObj);
		} else {
			res.json("illegal data");
		}
	}
}