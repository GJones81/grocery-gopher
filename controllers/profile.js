let router = require('express').Router()

router.get('/user', (req, res) => {
	res.render('profile/user')
})

router.get('/admin', (req, res) => {
	res.render('profile/admin')
})

module.exports = router