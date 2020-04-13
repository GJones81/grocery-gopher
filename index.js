//MODULES
//require needed modules
let express = require('express')
let layouts = require('express-ejs-layouts')

//create app instance
let app = express()

//SETTINGS / MIDDLEWARE
//set template language to ejs
app.set('view engine', 'ejs')

//tell express to use the layouts module
app.use(layouts)

//tell express to use the static folder
app.use(express.static('static'))

//ROUTES

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