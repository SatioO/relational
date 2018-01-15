const mysql = require("mysql");
const config = require("./index");

const pool = mysql.createPool({
    connectionLimit: 100,
    host: config.database.host,
    user: config.database.user,
    password: config.database.password,
    database: config.database.database
});

module.exports = pool;
