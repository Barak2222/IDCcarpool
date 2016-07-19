var users = require('./users')

var auth = {
	login: function(req, res){
		if (!req.body) return res.sendStatus(400);
		if(users.login(req.body.username, req.body.password)){
			req.session.currentUser = req.body.username;
			res.json("true");
		} else {
			res.status(401).json("false");
		}
	},
	register: function(req, res){
		//validate the data
		if (!req.body) return res.sendStatus(400);

		//cannot have 2 user with the same id)
		if(users.isExist(req.body.username)){
			res.json("exist");
		}
		else{
			//create new user object
			var newuser={
				id: req.body.username,
				password: req.body.password,
				type: null,
				bDay: null,
				major: null,
				freshmanYear: null,
				graduationYear: null,
				car: null,
			}
			// push the new user objet to the array in users module
			users.createUser(newuser);
			res.json("sucsess");
		}

	},
	middleAuth: function(req, res, next){
		if(req.session.currentUser){
			next();
		} else {
			res.redirect('/public/accessDenied.html');
		}
	},
	getCurrentUser: function(req, res){
		res.json(req.session.currentUser);
	},
	logout: function(req, res){
		req.session.currentUser = null;
		res.json("true");
	}
}

module.exports = auth;