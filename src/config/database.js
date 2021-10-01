require('dotenv').config();

module.exports = {
  "development": {
    "username": process.env.PSQL_DB_USERNAME,
    "password": process.env.PSQL_DB_PASSWORD,
    "database": process.env.PSQL_DB_NAME,
    "host": process.env.PSQL_DB_HOST,
    "dialect": process.env.PSQL_DB_DIALECT
  },
  "test": {
    "username": "root",
    "password": null,
    "database": "database_test",
    "host": "127.0.0.1",
    "dialect": "mysql",
    "operatorsAliases": false
  },
  "production": {
    "username": process.env.PROD_PSQL_DB_USERNAME,
    "password": process.env.PROD_PSQL_DB_PASSWORD,
    "database": process.env.PROD_PSQL_DB_NAME,
    "host": process.env.PROD_PSQL_DB_HOST,
    "dialect": process.env.PROD_PSQL_DB_DIALECT,
    "ssl": true,
    "operatorsAliases": false
  }
}
