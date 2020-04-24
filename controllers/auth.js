//Node modules/Variables for routers
let router = require('express').Router()
let db = require('../models')
let passport = require('../config/passportConfig')

//Routes

router.get('/login', (req, res) => {
	res.render('auth/login')
})

router.post('/login', passport.authenticate('local', {
	successFlash: 'Successful login - Welcome back!',
	successRedirect: '/profile/user',
	failureFlash: 'Invalid password',
	failureRedirect: '/auth/login'
}))

router.get('/signup', (req, res) => {
	res.render('auth/signup', {data: {} })
})

router.post('/signup', (req, res, next) => {
	console.log('REQUEST BODY', req.body)
	if (req.body.password != req.body.password_verify) {
		//Send a message about why things didn't work
		req.flash('error', 'Passwords do not match')

		//Put the user back onto the signup form to try again
		res.render('auth/signup', {data: req.body, alerts: req.flash() })
	}
	else {
		//Passwords matched, now we'll find/create by the user's 
		//email
		db.user.findOrCreate({
			where: {email: req.body.email },
			defaults: req.body
		})
		.then(([user, wasCreated]) => {
			if (wasCreated) {
			passport.authenticate('local', {
				successFlash: 'Successful login - Welcome!',
				successRedirect: '/profile/user',
				failureFlash: 'Invalid password',
				failureRedirect: '/auth/login'
			})(req, res, next)
			}
			else {
				// They already had an account!
				req.flash('error', 'You already have an account')
				res.redirect('/auth/login')
			}
		})
		.catch(err => {
			//Print the whole error to the terminal
			console.log('Error while creating a user', err )
			
			//Check for Sequelize validation errors (make flash message for them)
			if (err.errors) {
				err.errors.forEach(e => {
					req.flash('error', e.message)
				})
				//put the user back onto the signup form to try again
				res.render('auth/signup', {data: req.body, alerts: req.flash() })
			}
			else {
				req.flash('error', 'Server error')

			//Redirect back to sign up
			res.redirect('/auth/signup')
			
			}
		})
	}
})

router.get('/logout', (req, res) => {
	//Remove user data from the session
	req.logout()
	//Tell them goodbye
	req.flash('success', 'Thanks for stopping by')
	res.redirect('/')
})
//Export (allow this file to be included in another page)
module.exports = router