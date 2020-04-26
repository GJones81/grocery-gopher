'use strict';
let bcrypt = require('bcryptjs')

module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define('user', {
    firstname: {
      type: DataTypes.STRING,
      validate: {
        len: {
          args: [1, 255],
          msg: 'First name is required'
        }
      }
    },
    lastname: {
      type: DataTypes.STRING,
      validate: {
        len: {
          args: [1,255],
          msg: 'Last name is required'
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: {
          msg: 'Please enter an email'
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        len: {
          args: [6, 32],
          msg: 'Password must be between 6 and 32 characters'
        }
      }
    },
    username: DataTypes.STRING,
    birthday: DataTypes.DATE,
    admin: DataTypes.BOOLEAN,
    zipcode: DataTypes.INTEGER,
    sharedId: DataTypes.INTEGER
  }, {
    hooks: {
      beforeCreate: pendingUser => {
        //Hash the password
        let hashedPassword = bcrypt.hashSync(pendingUser.password, 12)

        //reassigned the hashed password (overwrite
        //the plain-text password)
        pendingUser.password = hashedPassword
      }
    }
  });


  user.associate = function(models) {
    // associations can be defined here
  };

user.prototype.validPassword = function(typedInPassword) {
  //Determine if the password typed in hashes to the same string 
  //as the existing hash
  let correctPassword = bcrypt.compareSync(typedInPassword, this.password)
  //Return the boolean result
  return correctPassword
}

  return user;
};