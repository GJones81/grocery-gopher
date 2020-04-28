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
			userId: req.user.id,
		},
		order: [ 'list_order'],
		limit: 3
	})
	.then((list) => {
		res.render('shopping/index', { list })
	})
	.catch((err) => {
		console.log('Error', err)
	})
})

//router for adding the 'picked' items to the inventory list
//router.post

module.exports = router