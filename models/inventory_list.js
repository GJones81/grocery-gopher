'use strict';
module.exports = (sequelize, DataTypes) => {
  const inventory_list = sequelize.define('inventory_list', {
    userId: DataTypes.INTEGER,
    item_name: DataTypes.STRING
  }, {});
  inventory_list.associate = function(models) {
    // associations can be defined here
  };
  return inventory_list;
};