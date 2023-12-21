const db = require('./database');

const database =
{
    create_db: async () => {
        const sql = 'create database if not exists wwebjs CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;';
        db.query(sql, (err, result) => {
            if (err) {
                throw err;
            } else {
                console.log(result);

            }
        })

    },

    create_table: async () => {
        const sql = 'create table if not exists contact_info' +
            '( id int primary key auto_increment, message_date date, message_time time, ' +
            ' user_name varchar(255), phone_number varchar(255), action varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci);';
        db.query(sql, (err, result) => {
            if (err) {
                throw err;
            } else {
                console.log(result);

            }
        })
    },

    save_user: async (data) => {
        const { name, phone_number, action } = data;
        const sql = `insert into contact_info (message_date, message_time, user_name, phone_number, action) ` +
            `values (CURDATE(), CURTIME(), ?, ?, ?);`;
        db.query(sql, [name, phone_number, action], (err, result) => {
            if (err) {
                throw err;
            } else {
                console.log(result);

            }

        })

    }
}

module.exports = database;