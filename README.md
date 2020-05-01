# Grocery Gopher

This is an express app for saving, editing, and using a grocery list while shopping. It is styled with a mobile-first mindset. The app also includes an API to retrieve recipes and save them to a database.

This app makes use of two tables to manage the grocery list. The active_list table is for the current list only, and is populated by a findOrCreate function so there aren't duplicate entries. The inventory_list is populated by a simple create function. The presence of duplicate entires is used to create a list of all items purchased twice or more in the last 30 days. 

This is done by quering the table for all items purchased in the last 30 days. The resulting data is then processed to created an array of objects wherein the key is an item name and the value is the number of times it appeared. Then an 'if' statement evaluates the key:value pairs, adding all values of two or greater into a new array, which sent back to the client-side to be displayed.

The issue which I would correct first if I had more time would be the user experience around adding and reordering items on their current shopping list. Currently the user must type in and submit the order number for each item one at a time, as the button for each button only works for that item. Furthermore, the app submits the edit to database and then requeries the database to rerender the page. The result is the items on the list changing order after each submition. Beyond that, it would be nice to facilitate changing the order by pressing and dragging each item row into the desired place. 

The original plan was to include a route to add ingredients from the recipe lists into the shopping list. The API data was not properly formatted for this, and will require some processing and handling to keep the database tidy.

Additionally, the Active_list and Recipe models include a column titled shareId. The sharedId column was included to facilitate future scaling to incorporate the sharing of profiles, and thus shopping lists. Furthermore, the birthdate column was also included to allow for age evaluation in a later version.

It would be very interesting to incorporate some level of machine learning into this app. Currently the user sets the order in which the shopping list is presented. I'm curious if this could become the input for a subroutine which, over time, learns each users preferred route through the store.

## What it includes

* Local Auth (email and password)
* Passport and Passport-local
* Sessions for saving user info and displaying flash messages
* Settings for PostgresSQL and Sequelize
* Hashed passwords
* EJS templating and EJS layouts
* Sequelize User model
* Materialize styling - nav and footer
* Axios for the API call

## Included Models

**User Model**
| Column | Type | Notes |
|----------|----------|--------------------|
|id | Integer | Serial primary key|
|firstname  | String  | User's first name|
|lastname | String  | User's last name|
|email |  String  | Unique Login  |
|password | String  | Hash  |
|username | String  | - |
|birthday | Date  | - |
|admin  | Boolean | Defaulted False |
|createdAt  | Date  | created at  |
|updatedAt  | Date  | last updated at |

**Active_list Model**
| Column  | Type  | Notes |
|----------|----------|------------------|
| id  | Integer | Serial primary key  |
| userId  | Integer | Foreign key to User table |
| sharedId  | Integer | Intended for later scaling  |
| item_name | String  | The grocery item  |
| list_order  | Integer | A value for organizing the list |
| createdAt | Date  | created at  |
| updatedAt | Date  | last updated at |

**Inventory_list Model**
| Column  | Type  | Notes |
|----------|----------|------------------|
| id  | Integer | Serial primary key  |
| userId  | Integer | Foreign key to User table |
| item_name | String  | the grocery item  |
| createdAt  | Date  | created at  |
| updatedAt | Date  | last updated at |

**Recipe Model**
| Column  | Type  | Notes |
|----------|----------|-------------------|
| id  | Integer | Serial primary key  |
| userId  | Integer | Foreign key to User table |
| sharedId  | Integer | Intended for later scaling  |
| label | String  | The title of the dish |
| ingredients | Array:String  | An array of strings |
| image | String  | url to an image |
| url | String  | url to the directions   |
| createdAt | Date  | created at  |
| updatedAt | Date  | last updated  |



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
|GET  | 'profile/admin' | Admin Profile |

# Inventory
| Method  | Path  | Purpose |
|----------|----------|---------------------|
| GET | 'inventory/index' | Shows the inventory list|
| POST  | 'inventory/index' | Adds inventory item to shopping list|

# List
| Method  | Path  | Purpose |
|----------|----------|--------------------|
| GET | 'list/index'  | Gets the current shopping list|
| POST  | 'list/index'  | Adds items to current list  |
| PUT   | 'list/index'  | Edits the list_order number |
| DELETE  | 'list/index'  | Deletes an item from the list|

# Shopping
| Method  | Path  | Purpose |
|----------|----------|--------------------|
| GET | 'shopping/index'  | Query orders by list_order, limit 3|
| POST  | 'shopping/new'  |Adds item to inventory_list, deletes from active_list|

# Recipe
| Method  | Path  | Purpose |
|----------|----------|--------------------|
| GET | 'recipe/index'  | Gets recipe page  |
| GET | 'recipe/new'  | Calls API for recipes |
| POST  | 'recipe/show' | Adds new recipes to table |
| GET | 'recipe/favorite' | Gets recipes from table |


## Directions for Use

### 1. Clone the repository, but with a different name

...sh
git clone <repo_link> <new_name>
...

Example:

...sh
git clone https://github.com/GJones81/grocery-gopher.git new_name_example
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
