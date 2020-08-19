'use strict';
module.exports = function (sequelize, DataTypes) {
    var user = sequelize.define('user', {
        username: DataTypes.STRING,
        password: DataTypes.STRING,
        email: DataTypes.STRING,
        name: DataTypes.STRING,
        photo: DataTypes.STRING,
        level: DataTypes.ENUM(['admin', 'member']),
        is_active: DataTypes.TINYINT
    }, {
        underscored: true,
    });
    user.associate = function (models) {
        // associations can be defined here
    };
    return user;
};
