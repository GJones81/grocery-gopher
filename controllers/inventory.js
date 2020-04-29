let router = require('express').Router()
let moment = require('moment')
let db = require('../models')
let Sequelize = require('sequelize')
let Op = Sequelize.Op

//route for showing the current inventory list
//the current inventory list contains a subset of the inventory list wherein
// 1) Only items added in the last 30 days
// 2) Only show to the user items which occurr in the subset twice or more
router.get('/index', (req,res) => {
	db.inventory_list.findAll({
		where: {
			userId: req.user.id,
			createdAt: {
				//returns only the items added to the table in the last 30 days
				[Op.gt] : new Date(new Date() - 30 * 24 * 60 * 60 * 1000)
			}
		}
	})
	.then((data) => {
		let dataArray = []
		data.forEach(object => {
			//takes the result from the database and turns it into an array of
			//strings
			dataArray.push(object.item_name)
			dataArray.sort()
		})
		//this code block takes the array of strings and turns it into an 
		//object wherein each word from the original array shows only once as 
		//a key with it's value being the number of times it occured in the array

		//takes the array of strings and changes it into a single string
		let dataString = dataArray.toString()
		//takes the original array of strings from line 22 and uses the RegExp 
		//constructor to turn it into a regex expression
		regex = new RegExp(dataArray.join("|"), ("g"))
		//takes the new regex expression and gives it to .match() to check the string
		//from line 30
		matches = dataString.match(regex)
		//this counter functions adds the number of occurences to the values of an object
		let counter = {}
		matches.forEach(m => {
			counter[m] = counter[m] + 1 || 1
		})
		//this code block takes the object from line 39, creates an array of the keys
		//and uses that array to iterate through the object and evaluate each value
		let results = []

		let keys = Object.keys(counter)
		for (let i = 0; i < keys.length; i++) {
			if (counter[keys[i]] > 1) {
				results.push(keys[i])
			}
		}
		res.render('inventory/index', { results })
		})
		
	})

//route for adding the inventory list items to the current 
//shopping list
router.post('/index', (req, res) => {
	db.active_list.findOrCreate({
		where: {
			userId: req.user.id,
			item_name: req.body.item_name
		}
	})
	.then(() => {
		res.redirect('/inventory/index')
	})
	.catch(err => {
		console.log(err)
		res.render('error')
	}) 
})


//??route for cleaning out rows older than 60 days??
//router.delete


module.exports = router