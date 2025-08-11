// db.js
const mysql = require('mysql2');

// Create a connection
const connection = mysql.createConnection({
  host: 'localhost',     // or your IP if remote
  user: 'root',          // default MySQL user
  password: '', // replace with your MySQL root password
  database: 'bottega', // replace with your DB name
});

// Connect to the database
connection.connect((err) => {
  if (err) {
    console.error('❌ Error connecting to MySQL:', err.message);
    return;
  }
  console.log('✅ Connected to the MySQL database!');
});

module.exports = connection;
