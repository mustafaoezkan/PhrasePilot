const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Word = sequelize.define('Word', {
  term: {
    type: DataTypes.STRING,
    allowNull: false
  },
  definition: {
    type: DataTypes.STRING,
    allowNull: false
  }
});

module.exports = Word;
