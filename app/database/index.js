const { Sequelize } = require("sequelize");
require('dotenv').config()

const DB_NAME = process.env.MYSQL_DATABASE;
const DB_USER = process.env.MYSQL_USERNAME;
const DB_PASS = process.env.MYSQL_ROOT_PASSWORD;
const DB_CONFIG = {
  dialect: process.env.MYSQL_DIALECT,
  host: process.env.MYSQL_HOST,
  port: process.env.MYSQL_PORT,
};

let db = {};

try {
  db = new Sequelize(DB_NAME, DB_USER, DB_PASS, DB_CONFIG);
} catch (error) {
  console.error('Unable to connect to the database:', error);
}

const hasConnection = async () => {
  try {
    await db.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};

Object.assign(db, { hasConnection });

module.exports = db;
