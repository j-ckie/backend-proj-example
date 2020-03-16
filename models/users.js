'use strict';
module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define('Users', {
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.TEXT
  }, {});
  Users.associate = function(models) {
    // associations can be defined here
  };
  return Users;
};