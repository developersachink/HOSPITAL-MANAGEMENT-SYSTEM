var express = require('express');
var router = express.Router();

 function logout(req, res,next){
	
		// Check if user is logged in (optional)
		if (req.session && req.session.loggedin) {
			// Destroy the session
			req.session.destroy((err) => {
				if (err) {
					console.error('Error destroying session:', err);
				} else {
					// Redirect the user to the login page or any other page
					res.redirect('/login');
				}
			});
		} else {
			// If the user is not logged in, simply redirect to the login page
			res.redirect('/login');
		}
	}

module.exports = logout;