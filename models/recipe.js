'use strict';
module.exports = (sequelize, DataTypes) => {
  const recipe = sequelize.define('recipe', {
    userId: DataTypes.INTEGER,
    sharedId: DataTypes.INTEGER,
    label: DataTypes.STRING,
    ingredients: DataTypes.ARRAY(DataTypes.STRING),
    image: DataTypes.STRING,
    url: DataTypes.STRING
  }, {});
  recipe.associate = function(models) {
    // associations can be defined here
    models.recipe.belongsTo(models.user)
  };
  return recipe;
};