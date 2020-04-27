let router = require('express').Router()
let moment = require('moment')
let db = require('../models')

//route for showing the current shopping list
router.get('/show', (req, res) => {
	db.active_list.findAll()
	.then((list) => {
		res.render('list/show', { list })
	})
})

//route for editing the current list; order of items
//router.put

//route for deleting the current list once the user 
//is done with it
//router.delete

//route to get the form for creating a new shopping list
router.get('/new', (req, res) => {
	res.render('list/new')
})

//route for putting the new items on the new list
router.post('/new', (req,res) => {
	console.log(req.body)
	db.active_list.findOrCreate({ 
		where: { 
			userId: req.user.id,
			item_name: req.body.item_name
		}
	})
	.then(() => {
		res.redirect('/list/show')
	})
	.catch((err) => {
		console.log('Error', err )
	})
})

module.exports = router