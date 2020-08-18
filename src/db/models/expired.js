'use strict';
module.exports = (sequelize, DataTypes) => {
  const expired = sequelize.define('expired', {
    token: DataTypes.TEXT
  }, {
    underscored: true,
  });
  expired.associate = function(models) {
    // associations can be defined here
  };
  return expired;
};