// backend/db.js
const mysql = require('mysql2');
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'sunami1226', // Replace with your MySQL password
  database: 'mindtrack'
});

connection.connect((err) => {
  if (err) throw err;
  console.log('Connected to MySQL database.');
});

module.exports = connection;
