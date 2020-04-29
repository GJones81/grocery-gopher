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
			dataArray.sort()
		})
		console.log(dataArray)

		let dataString = dataArray.toString()
		regex = new RegExp(dataArray.join("|"), ("g"))
		matches = dataString.match(regex)
		let counter = {}
		matches.forEach(m => {
			counter[m] = counter[m] + 1 || 1
		})

		console.log(counter)

		let results = []

		let keys = Object.keys(counter)
		for (let i = 0; i < keys.length; i++) {
			if (counter[keys[i]] > 2) {
				results.push(keys[i])
			}
		}
		console.log(results)
		res.render('inventory/show', { results })
		})
		
	})


//??route for cleaning out rows older than 60 days??
//router.delete


module.exports = router