let router = require('express').Router()
let moment = require('moment')
let db = require('../models')
let Sequelize = require('sequelize')
let Op = Sequelize.Op

//route for bringing up the current shopping list three items
//at a time
router.get('/index', (req, res) => {
	db.active_list.findAll({
		where: {
			userId: req.user.id
		},
		order: [ 'list_order'],
		limit: 3
	})
	.then((list) => {
		res.render('shopping/index', { list })
	})
	.catch(err => {
		console.log(err)
		res.render('error')
	})
})

//route for adding the 'picked' items to the inventory_list
//also delete the items from the active_list
router.post('/new', (req, res) => {
	db.inventory_list.create(req.body)
	.then(() => {
		db.active_list.destroy({
			where: {
				userId: req.user.id,
				item_name: req.body.item_name
			}
		})
	})
	.then(() => {
		res.redirect('/shopping/index')
	})
	.catch(err => {
		console.log(err)
		res.render('error')
	})
})

module.exports = router