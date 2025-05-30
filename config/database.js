const mysql = require('mysql2/promise');
const util = require('util');

const pool = mysql.createPool({
    connectionLimit: 10,
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'tallerNodeJs'
});

module.exports = pool;