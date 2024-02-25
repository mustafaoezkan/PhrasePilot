const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const User = sequelize.define('User', {
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  status: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  word_list: {
    type: DataTypes.ARRAY(DataTypes.INTEGER),
    defaultValue: []
  }
});

module.exports = User;
