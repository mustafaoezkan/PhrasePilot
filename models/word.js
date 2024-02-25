const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Word = sequelize.define('Word', {
  word_name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  word_form: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  word_meaning: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  word_usage: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  creator: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
});

module.exports = Word;
