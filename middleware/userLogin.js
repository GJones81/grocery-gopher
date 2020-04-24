module.exports = (req, res, next) => {
	//req.user is the user object in the session
	if (req.user){
		//logged in, proceed with next()
		next()//proceed as planned
	}
	else {
		//not logged in. Send them an error message and redirect them
		//to the login page
		req.flash('error', 'You must be logged in to view that page')
		res.redirect('/auth/login')
	}
}