let router = require('express').Router()
//moment module formats the date/time displays
let moment = require('moment')
let adminLogin = require('../middleware/adminLogin')
let userLogin = require('../middleware/userLogin')
let db = require('../models')

//Custom middleware that is only applied to the
//routes in this file
router.use(userLogin)

//a normal profile for the non-admins
//NOTE: Protect this route from users who are not logged in
router.get('/user', (req, res) => {
	res.render('profile/user', { moment })
})

//GET /profile/guest/userId - viewing a user's profile
//as a guest
router.get('/guest/:id', (req, res) => {
	db.user.findByPk(req.params.id)
		.then(userProfile => {
			res.render('profile/guest', { moment, userProfile })
		})
		.catch(err => {
			console.log(err)
			res.render('error')
		})
	})

//a profile for admins
//NOTE: Protect this route from users who are not
//logged in, or users
router.get('/admin', adminLogin, (req, res) => {
	db.user.findAll()
	.then(users => {
		res.render('profile/admin', { moment, users })
	})
	.catch(err => {
			console.log(err)
			res.render('error')
	})
	
})

module.exports = router