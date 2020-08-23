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
    "username": "cpbxfchmwqrcnm",
    "password": "b0edcd151b338000583cefef9384dbb02e3dae49bae220e6453e9b3cced7b177",
    "database": "des65gh3nocuu9",
    "host": "ec2-52-204-20-42.compute-1.amazonaws.com",
    "dialect": "postgres",
    "operatorsAliases": false
  }
}
