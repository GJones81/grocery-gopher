let router = require('express').Router()
let moment = require('moment')
let db = require('../models')

router.get('/create', (req, res) => {
	res.render('recipe/create')
})

router.get('/new', (req, res) => {
	res.render('recipe/new')
})

router.get('/show', (req, res) => {
	res.render('recipe/show')
})


module.exports = router