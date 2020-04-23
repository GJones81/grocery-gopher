//Require environment variables
require('dotenv').config()

//require node_modules
let passport = require('passport')

//Require any Strategies (AKA types of auth that we want to use)
let LocalStrategy = require('passport-local').Strategy

//import reference to a local database
let db = require('../models')

//Serialization and Deserialization functions
//These are for passport to use in order to store/lookup user
//information

//SERIALIZE: Reduce a user object to just its id field
passport.serializeUser((user, done) => {
	//Call the callback function with the user id as an argument
	//done(error, id) - pass a null if no error
	done(null, user.id)
})

//DESERIALIZE: Reverse the process of the serialize function
//take the user id and return the full user object
passport.deserializeUser((id, done) => {
	db.user.findByPk(id)
	.then(user => {
		done(null, user)
	})
	.catch(done)
})

//LOCAL STRATEGY: Using a database that we manage ourselves (not OAuth)
passport.use(new LocalStrategy({
	usernameField: 'email',
	password: 'password'
}, (email, password, done) => {
	//Try looking up the user by their email
	db.user.findOne({
		where: {email: email}
	})
	.then(foundUser => {
		//Check to see if there is a user; if yes, then check their password
		if (foundUser && foundUser.validPassword(password)) {
			//This is good - user exists and password is correct
			done(null, foundUser)
		}
		else {
			//This is bad - user doesn't exist, or password was bad
			done(null, null)
		}
	})
	.catch(done)
}))

//Export this file so other files may use it
module.exports = passport