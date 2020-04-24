# Node Auth Boilerplate

This is a boiler plate for an express app with local user authentication. It exists so I have a customized boilerplate and don't have to start from scratch on all my projects

## What it includes

* Local Auth (email and password)
* Passport and Passport-local
* Sessions for saving user info and displaying flash messages
* Settings for PostgresSQL and Sequelize
* Hashed passwords
* EJS templating and EJS layouts
* Sequelize User model
* Materialize styling - nav and footer

## Included Models

**User Model**
| Column | Type | Notes |
|----------|----------|--------------------|
|id | Integer | Serial primary key|
|firstname  | String  | User's first name|
|lastname | String  | User's last name|
|email |  String  | Unique Login  |
|password | String  | Hash  |
|birthday | Date  | - |
|admin  | Boolean | Defaulted False |
|pic  | String  | - |
|bio  | Text  | - |
|createdAt  | Date  | created at  |



## Included Routes 
# Index
| Method  | Path  | Purpose |
|----------|----------|---------------------|
|GET  | '/' | Home page |
|GET  | * | Catch-all for 404|

# Auth
|Method | Path  | Purpose |
|----------|-----------|------------|
|GET  | 'auth/login'| Login Page  |
|POST | 'auth/login'  | Authentication  |
|GET  | 'auth/signup' | Signup Page |
|POST | 'auth/signup' | Creates New User  |
|GET  | 'auth/logout' | Logs out of the Session|

# Profile
|Method | Path  | Purpose |
|----------|----------|--------------------|
|GET  | 'profile/user'  | User Profile  |
|GET  | 'profile/guest/:id' | Guest Profile |
|GET  | 'profile/admin' | Admin Profile |

## Directions for Use

### 1. Clone the repository, but with a different name

...sh
git clone <repo_link> <new_name>
...

Example:

...sh
git clone https://github.com/GJones81/node-auth-boiler.git new_name_example
...

### 2. Install the modules from package.json

...sh
npm i
...

### 3. Customize the new project 

Remove defaulty stuff. For example:

* Title in 'layout.ejs'
* Logo field in the nav bar
* Description and Repository fields in package.json
* Remove this boilerplate's readme content (Don't leave this one here on the next project)
* Switch Favicon to the new project's favicon

### 4. Create new database for new project 

...sh
createdb new_db_name
...

### 5. Alter config.json of the new database

config/config.json

Update database name to new_db_name
Check username, password, and dialect

### 6. Check model 

Check the model for relevance to the requirements of the new project, and change as
needed. The model will dictate what columns the table has.

### 7. Run Sequelize migrations

...sh
sequelize db:migrate
...

### 8. Create a .env file for environment variables

...sh
touch .env
...

Include the following .env variables

* SESSION_SECRET  - this is the key for session to use

### 9. Run the server, ensure it works

...sh
nodemon
...

Without nodemon

...sh
node index.js
...

### 10. Delete the origin that points to the boilerplate repository

If we run this command:
...sh
git remote -v
...

It will show 'origin' as being hooked up to the boilerplate repository. We want a fresh
repository instead, so let's delete the origin remote:

...sh
git remote remove origin
...

### 11. Create an empty git repository

Via the Github website. Follow the directions as they show up when you create a new
repository

...sh
git init
git add .
git commit -m "Initial Commit"
git remote add origin <new_repo_link>
git push origin master
...

Happy Developing!!
