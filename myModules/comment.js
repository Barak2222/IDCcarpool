var rides = require('./rides');
var notifications = require('./notifications');


//constructor
function Comment(author, rideID, message){
	this.author = author;
	this.rideID = rideID; // parent node
	this.message = message;
	this.time = new Date();
}

module.exports = {
	init: function(){
	},
	createComment(req, res){
		var author = req.session.currentUser;
		var rideID = req.body.rideID;
		var message = req.body.message;

		if(rideID >=0 && message.length > 0 && message.length < 120){
			notifications.newCommentAdded(author, rideID);
			var commentObj = new Comment(author, rideID, message);
			rides.addComment(commentObj, rideID);
			res.json(commentObj);
		} else {
			res.json("illegal data");
		}
	}
}