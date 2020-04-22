//Node modules/Variables for routers
let router = require('express').Router()

//Routes

router.get('/login', (req, res) => {
	res.render('auth/login')
})

router.post('/login', (req, res) =>{
	console.log('DATA', req.body)
	res.send('Hello from the post route')
})

router.get('/signup', (req, res) => {
	res.render('auth/signup', {data: {} })
})

router.post('/signup', (req, res) => {
	console.log('REQUEST BODY', req.body)
	if (req.body.password != req.body.password_verify) {
		//Send a message about why things didn't work
		//Put the user back onto the signup form to try again
		res.render('auth/signup', {data: req.body })
	}
	else {
		res.send('POST route reached - PASSWORDS WERE GOOD!')
	}
})

//Export (allow this file to be included in another page)
module.exports = router