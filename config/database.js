const mysql = require('mysql2/promise');

const pool = mysql.createPool({
    connectionLimit: 10,
    waitForConnections: true,
    multipleStatements: true,
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASS,    
    database: process.env.DATABASE_NAME
});

module.exports = pool;