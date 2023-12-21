const express = require('express');
const router = express.Router();
const database = require('../database/queries');

router.post('/send_message', async (req, res) => {

    try {

        const response_data =
        {
            status: 'success',
            message: 'Message Received',
            response: 'Data was saved in database',
        };

        res.send(response_data);

        if (req.body) {
            console.log(req.body);


            // create database
            await database.create_db();
            // create table
            await database.create_table();
            // save data to database
            await database.save_user(req.body);
        }


    }
    catch (err) {
        console.error('Error saving data to the database:', err.message);
        res.status(500).json({ error: 'Internal Server Error' });

    }




});

module.exports = router;