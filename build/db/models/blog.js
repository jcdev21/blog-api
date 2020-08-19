'use strict';
module.exports = function (sequelize, DataTypes) {
    var blog = sequelize.define('blog', {
        user_id: DataTypes.INTEGER,
        title: DataTypes.STRING,
        content: DataTypes.TEXT,
        blog_image: DataTypes.STRING
    }, {
        underscored: true,
    });
    blog.associate = function (models) {
        blog.belongsTo(models.user);
    };
    return blog;
};
