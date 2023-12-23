const express = require('express');
const router = express.Router();
const database = require('../database/queries');


router.get('/recipient', async (req, res) => {
    try {
        const recipient = await database.get_phone();
     
        console.log("THE DATA FROM API ENDPOINT: ", recipient);
        res.json(recipient);


    } catch (err) {
        console.error('Error failed to get phone number:', err.message);
        res.status(500).json({ error: 'Internal Server Error' });

    }


});


router.post('/phone_number', async (req, res) => {

    try {

        const response_data =
        {
            status: 'success',
            message: 'Message Received',
            response: 'Phone number was saved in the DB',
            phone_number: req.body,
        };

        res.send(response_data);

        if (req.body) {
            console.log(req.body);


            // create table
            await database.create_t_phone();
            // save data to database
            await database.save_phone(req.body);
        }


    }
    catch (err) {
        console.error('Error saving phone to the database:', err.message);
        res.status(500).json({ error: 'Internal Server Error' });

    }




});


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


            // create table
            await database.create_t_contact_info();
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