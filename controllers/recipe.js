let router = require('express').Router()
let moment = require('moment')
let db = require('../models')
let axios = require('axios')

//route to get the recipe index page
router.get('/index', (req, res) => {
	res.render('recipe/index')
})

//route to get the form for user's to input their own recipes
router.get('/create', (req, res) => {
	res.render('recipe/create')
})

//route to add the user's recipes to the database
//router.post('/create')

//route to retrieve new recipes from the API's
//API calls will occur here
router.get('/new', (req, res) => {
	let edamamAPI = `https://api.edamam.com/search?q=${req.query.ingredient}&app_id=${process.env.EDAMAM_APP_ID}&app_key=${process.env.EDAMAM_APP_KEY}`
	axios.get(edamamAPI)
	.then((apiResponse) => {
		let recipeData = apiResponse.data
		console.log(recipeData)
		res.render('recipe/new', { recipeData })
	})
	.catch((err) => {
		console.log('Error', err)
	})
	
})

//route to add recipes selected from the API results
//router.post('/new')

//route to get the current list of user's favorite recipes
router.get('/show', (req, res) => {
	res.render('recipe/show')
})



module.exports = router