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


## Included Routes 

## Directions for Use
