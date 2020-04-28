'use strict';
module.exports = (sequelize, DataTypes) => {
  const inventory_list = sequelize.define('inventory_list', {
    userId: DataTypes.INTEGER,
    item_name: DataTypes.STRING
  }, {});
  inventory_list.associate = function(models) {
    // associations can be defined here
    models.inventory_list.belongsTo(models.user)
  };
  return inventory_list;
};