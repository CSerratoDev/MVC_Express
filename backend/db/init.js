const fs = require('fs');
const path = require('path');
const pool = require('../config/database'); // o donde tengas tu conexión

const initDB = async () => {
    try {
        const sqlPath = path.join(__dirname, 'init.sql');
        const sql = fs.readFileSync(sqlPath, 'utf8');
        await pool.query(sql);
        console.log('✅ init.sql ejecutado correctamente');
    } catch (err) {
        console.error('❌ Error al ejecutar init.sql:', err.message);
    }
};

module.exports = initDB;
