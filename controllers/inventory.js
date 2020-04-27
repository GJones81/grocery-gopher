let router = require('express').Router()
let moment = require('moment')
let db = require('../models')

//route for showing the current inventory list
router.get('/show', (req,res) => {
	res.render('inventory/show')
})

//route for adding items to the inventory list
//inventory query will happen here:
//createdAt date 30 days or less
//two or more entries present in the query result
//router.post

//??route for cleaning out rows older than 60 days??
//router.delete


module.exports = router