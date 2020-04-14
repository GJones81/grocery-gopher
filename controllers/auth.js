//Node modules/Variables for routers
let router = require('express').Router()

//Routes

router.get('/login', (req, res) => {
	res.render('auth/login')
})

router.get('/signup', (req, res) => {
	res.render('auth/signup')
})

router.post('/login', (req, res) =>{
	console.log('DATA', req.body)
	res.send('Hello from the post route')
})

//Export (allow this file to be included in another page)
module.exports = router