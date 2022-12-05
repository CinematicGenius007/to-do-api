const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'bruh',
    password: 'Qwerty!1',
    database: 'node_todo'
});

connection.connect((err) => {
    if (err) throw err;
    console.log('Database Connected!');
});

module.exports = connection;