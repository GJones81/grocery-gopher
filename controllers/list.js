let router = require('express').Router()
let moment = require('moment')
let db = require('../models')

router.get('/new', (req, res) => {
	res.render('list/new')
})

router.get('/show', (req, res) => {
	res.render('list/show')
})


module.exports = router