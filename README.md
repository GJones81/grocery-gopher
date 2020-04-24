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
* 
* 
