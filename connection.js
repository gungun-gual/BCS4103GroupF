const Pool = require('pg').Pool;

const pool = new Pool({
    user: 'admin',
    host: 'localhost',
    database: 'ecommerce',
    password: 'admin',
    port: '5432'
});


module.exports = pool;
