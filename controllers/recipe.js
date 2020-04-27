let router = require('express').Router()
let moment = require('moment')
let db = require('../models')

//route to get the form for user's to input their own recipes
router.get('/create', (req, res) => {
	res.render('recipe/create')
})

//route to add the user's recipes to the database
//router.post('/create')

//route to retrieve new recipes from the API's
//API calls will occur here
router.get('/new', (req, res) => {
	res.render('recipe/new')
})

//route to add recipes selected from the API results
//router.post('/new')

//route to get the current list of user's favorite recipes
router.get('/show', (req, res) => {
	res.render('recipe/show')
})



module.exports = router