const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
  database: 'PhrasePilot',
  username: process.env.POSTGRE_USERNAME,
  password: process.env.POSTGRE_PASSWORD,
  host: 'localhost',
  dialect: 'postgres' // Adjust the dialect if you are using a different database
});

module.exports = sequelize;
