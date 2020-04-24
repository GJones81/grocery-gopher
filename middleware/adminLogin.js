module.exports = (req, res, next) => {
	if (req.user && req.user.admin) {
		next()
	}
	else {
		req.flash('error', 'This is an admin only page')
		res.redirect('/profile/user')
	}
}