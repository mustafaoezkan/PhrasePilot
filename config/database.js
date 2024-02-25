const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
  process.env.POSTGRE_DB_NAME,
  process.env.POSTGRE_USERNAME,
  process.env.POSTGRE_PASSWORD,
  {
    host: process.env.POSTGRE_HOST_IP, // Use the IP address of worker3 or 'localhost' if the code runs on the same host
    port: process.env.POSTGRE_PORT, // The port you mapped in your Docker command
    dialect: 'postgres',
    pool: {
      max: 5, // Maximum number of connection in pool
      min: 0, // Minimum number of connection in pool
      acquire: 30000, // The maximum time, in milliseconds, that pool will try to get connection before throwing error
      idle: 10000 // The maximum time, in milliseconds, that a connection can be idle before being released
    }
  }
);

module.exports = sequelize;
