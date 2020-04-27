let router = require('express').Router()
let moment = require('moment')
let db = require('../models')

//route for bringing up the current shopping list three items
//at a time
router.get('/show', (req, res) => {
	res.render('shopping/show')
})

//router for adding the 'picked' items to the inventory list
//router.post

module.exports = router