let router = require('express').Router()
let moment = require('moment')
let db = require('../models')

router.get('/show', (req,res) => {
	res.render('inventory/show')
})


module.exports = router