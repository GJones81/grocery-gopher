//MODULES
//require needed modules
require('dotenv').config()

let express = require('express')
let flash = require('connect-flash')
let layouts = require('express-ejs-layouts')
let session = require('express-session')

//create app instance
let app = express()

//SETTINGS / MIDDLEWARE
//set template language to ejs
app.set('view engine', 'ejs')

//tell express to use the layouts module
app.use(layouts)

//tell express to use the static folder
app.use(express.static('static'))


//Decrypt the variables coming via POST routes aka forms
app.use(express.urlencoded({extended: false}))

//Set up sessions -- Server-side data-storage
app.use(session ({
	secret: process.env.SESSION_SECRET,
	resave: false,
	saveUninitialized: true
}))

//Set up connect-flash for the flash alert-
	//messages (depends of session, order matters)
app.use(flash())

// Custom middleware - make certain variables available
//to EJS pages through locals
app.use((req, res, next) => {
	res.locals.alerts = req.flash()
	next()
})


//ROUTES

//Controllers
app.use('/auth', require('./controllers/auth'))
app.use('/profile', require('./controllers/profile'))

//create homepage route
app.get('/', (req, res) => {
	res.render('homepage')
})


//create a 'catch-all' route, last inline
app.get('*', (req, res) => {
	res.render('error')
})

//
//pick a port to listen on
app.listen(3000)