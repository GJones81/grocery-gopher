let router = require('express').Router()
let moment = require('moment')
let db = require('../models')
let Sequelize = require('sequelize')
let Op = Sequelize.Op

//route for showing the current inventory list
router.get('/show', (req,res) => {
	db.inventory_list.findAll({
		where: {
			userId: req.user.id,
			createdAt: {
				[Op.gt] : new Date(new Date() - 30 * 24 * 60 * 60 * 1000)
			}
		}
	})
	.then((data) => {
		let dataArray = []
		data.forEach(object => {
			dataArray.push(object.item_name)
		})
		console.log(dataArray)
	})
	.then((result) => {
		res.render('inventory/show', { result })
	})
})


//??route for cleaning out rows older than 60 days??
//router.delete


module.exports = router