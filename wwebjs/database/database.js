require('dotenv').config();
const mysql = require("mysql");

const conifgs = {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    charset: 'utf8mb4'
};

let connection = mysql.createConnection(conifgs);
const target_name = 'wwebjs';
connection.connect((error) => {
    if (error) throw error;
    const sql = 'select schema_name from information_schema.schemata where schema_name = ?;';
    connection.query(sql, [target_name], (err, result) => {
        if (err) {
            console.error('Databse conenction: ', err);
        }
        else {
            // db exists
            if (result.length > 0) {
                console.log("Database exists!");
                console.log("Changing configs and reconnecting...");
                connect_toDB();

            } else {

                console.log("Database does not exist!");
                console.log("Creating the database");
                connection.query('create database if not exists wwebjs CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;', (err, result) => {

                    if (err) {
                        console.error("Failed to create database: ", err);
                    } else {
                        connect_toDB();
                    }
                });


            }

        }

    })





});

function connect_toDB() {
    conifgs.database = target_name;
    connection = mysql.createConnection(conifgs);
    connection.connect((error) => {
        if (error) {
            console.error('Failed Database reconnection: ', error);
        }
        else {
            console.log("Database reconnected to-> ", target_name);
        }


    })

}




module.exports = connection;
