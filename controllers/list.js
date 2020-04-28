let router = require('express').Router()
let moment = require('moment')
let db = require('../models')

//route for showing the current shopping list
//also brings up the form for entering new items
router.get('/index', (req, res) => {
	db.active_list.findAll({
		where: {
			userId: req.user.id
		}
	})
	.then((list) => {
		res.render('list/index', { list })
	})
	.catch(err => {
		console.log(err)
		res.render('error')
	})
})

//route for putting the new items on the active_list
router.post('/index', (req,res) => {
	db.active_list.findOrCreate({ 
		where: { 
			userId: req.user.id,
			item_name: req.body.item_name
		}
	})
	.then(() => {
		res.redirect('/list/index')
	})
	.catch(err => {
		console.log(err)
		res.render('error')
	})
})

//route for editing the current list; order of items
router.put('/index', (req, res) => {
	db.active_list.update({
		list_order: req.body.list_order
		}, {
		where: {
			userId: req.user.id,
			item_name: req.body.item_name
		}
	})
	.then(() => {
		res.redirect('/list/index')
	})
	.catch(err => {
		console.log(err)
		res.render('error')
	})
})

//route for deleting an item on the list
router.delete('/index', (req, res) => {
	db.active_list.destroy({
		where: {
			userId: req.user.id,
			item_name: req.body.item_name
		}
	})
	.then(() => {
		res.redirect('/list/index')
	})
	.catch(err => {
		console.log(err)
		res.render('error')
	})
})

module.exports = router