require('dotenv').config()
const { DB_HOST, DB_USER, DB_PASS } = process.env;

module.exports = {
    "development": {
        "username": DB_USER,
        "password": DB_PASS,
        "database": "agenda",
        "host": DB_HOST,
        "dialect": "postgres"
    },
    "test": {
        "username": "root",
        "password": null,
        "database": "database_test",
        "host": "127.0.0.1",
        "dialect": "postgres"
    },
    "production": {
        "username": "root",
        "password": null,
        "database": "database_production",
        "host": "127.0.0.1",
        "dialect": "postgres"
    }
}
