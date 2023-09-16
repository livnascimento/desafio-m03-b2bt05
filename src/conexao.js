const { Pool } = require('pg');

const pool = new Pool({
    host: '',
    port: ,
    user: '',
    password: '',
    database: ''
});

module.exports = pool;