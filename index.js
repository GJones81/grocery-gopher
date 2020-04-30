//MODULES
//Add in environment
require('dotenv').config()

//Require needed modules
let express = require('express')
let flash = require('connect-flash')
let layouts = require('express-ejs-layouts')
let session = require('express-session')
let methodOverride = require('method-override')

//create app instance
let app = express()

//Include passport (via the passport config file)
let passport = require('./config/passportConfig')

//SETTINGS / MIDDLEWARE
//set template language to ejs
app.set('view engine', 'ejs')

//tell express to use the layouts module
app.use(layouts)

//tell express to use the static folder
app.use(express.static('static'))


//Decrypt the variables coming via POST routes aka forms
app.use(express.urlencoded({extended: false}))

//method-override middleware
app.use(methodOverride('_method'))

//Set up sessions -- Server-side data-storage
app.use(session ({
	secret: process.env.SESSION_SECRET,
	resave: false,
	saveUninitialized: true
}))

//Set up connect-flash for the flash alert-
	//messages (depends of session, order matters)
app.use(flash())

//Set up passport (depends on sessions, so must come after it)
app.use(passport.initialize())
app.use(passport.session())

// Custom middleware - make certain variables available
//to EJS pages through locals
app.use((req, res, next) => {
	res.locals.alerts = req.flash(),
	res.locals.user = req.user
	next()
})


//ROUTES

//Controllers
app.use('/auth', require('./controllers/auth'))
app.use('/profile', require('./controllers/profile'))
app.use('/inventory', require('./controllers/inventory'))
app.use('/list', require('./controllers/list'))
app.use('/recipe', require('./controllers/recipe'))
app.use('/shopping', require('./controllers/shopping'))

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
app.listen(process.env.PORT || 3000)