'use strict';
module.exports = function (sequelize, DataTypes) {
    var expired = sequelize.define('expired', {
        token: DataTypes.TEXT
    }, {
        underscored: true,
    });
    expired.associate = function (models) {
        // associations can be defined here
    };
    return expired;
};
