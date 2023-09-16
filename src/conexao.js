const { Pool } = require('pg');
require('dotenv').config()

const host = process.env.HOST;
const port = process.env.PORT;
const user = process.env.USER;
const password = process.env.PASSWORD;
const database = process.env.DATABASE;

const pool = new Pool({
    host: host,
    port: port,
    user: user,
    password: password,
    database: database
});

module.exports = pool;