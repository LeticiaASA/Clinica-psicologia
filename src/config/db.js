const mysql = require('mysql');
require('dotenv').config();

const db = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: 'Univesp@compass',
    database: 'clinica_psicologia'
});

db.connect(err => {
    if (err) throw err;
    console.log('Conectado ao banco de dados MySQL.');
});

module.exports = db;
