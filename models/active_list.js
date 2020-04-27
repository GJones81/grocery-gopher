'use strict';
module.exports = (sequelize, DataTypes) => {
  const active_list = sequelize.define('active_list', {
    userId: DataTypes.INTEGER,
    sharedId: DataTypes.INTEGER,
    item_name: DataTypes.STRING,
    list_order: DataTypes.INTEGER
  }, {});
  active_list.associate = function(models) {
    // associations can be defined here
    models.active_list.belongsTo(models.user)
  };
  return active_list;
};