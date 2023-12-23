const db = require('./database');
const util = require('util');

const database =
{
 

    create_t_contact_info: async () => {
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

    },

    create_t_phone: async () => {

        const sql = 'create table if not exists phone_notify' +
            '( id int primary key auto_increment, phone_number varchar(255));';
        db.query(sql, (err, result) => {
            if (err) {
                throw err;
            } else {
                console.log(result);

            }
        })
    },

    save_phone: async (data) => {
        const { phone } = data;
        const sql = 'insert into phone_notify (phone_number) values (?);';
        db.query(sql, [phone], (err, result) => {
            if (err) {
                throw err;
            } else {
                console.log(result);

            }

        })
    },

    get_phone: async () => {
        try {
            const sql = 'select id, phone_number from phone_notify;';
            const query = util.promisify(db.query).bind(db);
            const rows = await query(sql);
            console.log('THE QUERY WAS MADE: ', rows);
            return rows;
        } catch (err) {
            console.error('Error executing database query:', error);
            throw error;

        }
    }
}

module.exports = database;