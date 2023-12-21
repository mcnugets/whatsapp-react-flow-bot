require('dotenv').config();
const mysql = require("mysql");

const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    charset: 'utf8mb4'
});

connection.connect((error) => {
    if (error) throw error;
    console.log("Connection exists!");
});


module.exports = connection;
