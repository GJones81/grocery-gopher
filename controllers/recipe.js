let router = require('express').Router()
let moment = require('moment')
let db = require('../models')
let axios = require('axios')

//route to get the recipe index page
router.get('/index', (req, res) => {
	res.render('recipe/index')
})


//route to add the user's recipes to the database
//router.post('/create')

//route to retrieve new recipes from the API's
//API calls will occur here
router.get('/new', (req, res) => {
	let edamamAPI = `https://api.edamam.com/search?q=${req.query.ingredient}&app_id=${process.env.EDAMAM_APP_ID}&app_key=${process.env.EDAMAM_APP_KEY}`
	axios.get(edamamAPI)
	.then((apiResponse) => {
		let recipeData = apiResponse.data.hits
		res.render('recipe/show', { recipeData })
	})
	.catch(err => {
		console.log(err)
		res.render('error')
	})
	
})

//route to add recipes selected from the API results
router.post('/show', (req, res) => {
	db.recipe.findOrCreate({
		where: {
			userId: req.user.id,
			label: req.body.label,
			ingredients: req.body.ingredients,
			image: req.body.image,
			url: req.body.url
		}
	})
	.then(() => {
		res.redirect('/recipe/favorite')
	})
	.catch(err => {
		console.log(err)
		res.render('error')
	})
})

//route to get the current list of user's favorite recipes
router.get('/favorite', (req, res) => {
	db.recipe.findAll({
		where: {
			userId: req.user.id
		}
	})
	.then((favorites) => {
		res.render('recipe/favorite', { favorites })
	})
	.catch(err => {
		console.log(err)
		res.render('error')
	})
	
})

module.exports = router