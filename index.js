const axios = require('axios');
const express = require('express');
const apiroute = require('./routes/api');
const fs = require('fs');
const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const client = new Client({
    authStrategy: new LocalAuth()
});
const file = 'database/database.json';

const app = express();
const port = 3000;
app.use(express.json());

app.use('/api', apiroute);

app.listen(port, () => {
    console.log(`Server started on port::${port}`);
})


client.on('qr', qr => {
    qrcode.generate(qr, { small: true });
});

client.on('ready', () => {
    console.log('Client is ready!');
    console.log('Phone number:', client.info.wid.user);

});

client.on('authenticated', () => {
    console.log('Authenticated!');


});
let consult_started = false;

client.on('message', async (message) => {
    console.log(message.from);
    console.log(message.body);

    if (message.body === '/консультация') {
        await client.sendMessage(message.from,
            'Здравствуйте. Ваша заявка на консультацию принята.' +
            'Как вам удобно переговорить устно или перепиской?');
        consult_started = true;



    }

    try {
        if (consult_started) {
            if (message.body === '/напишитемне' || message.body === '/позвонитемне') {
                await client.sendMessage(message.from, 'Ок. Первый освободившийся менеджер сразу же' +
                    'с вами свяжется. Спасибо за обращение.');

                let contact_type = "";
                if (message.body === '/напишитемне') {
                    contact_type = "text this person";
                } else {
                    contact_type = "call this person";

                }
                const name = (await message.getContact()).pushname;
                console.log(name);
                const phone_number = "+" + message.from.substring(0, 12);
                console.log(phone_number);
                const [time, date] = await unix_time(message.timestamp);
                await client.sendMessage("447412303606@c.us", `Такой-то человек ${name} с номером: ${phone_number}` +
                    'оставил заявку на получение консультации ' + contact_type + '. ' + `${time} ` + `${date}`);


                let action = (message.body === "/напишитемне") ? "/напишитемне" : "/позвонитемне";

                // json conversion
                const contact_info =
                {
                    name: name,
                    phone_number: phone_number,
                    action: action
                };
                // making post request
                await axios.post('http://localhost:3000/api/send_message',
                    contact_info,
                    {
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': 'SESSION_TOKEN'
                        },

                    })
                    .then(response => {
                        console.log('HTTP Request Response:', response.data);
                    })
                    .catch(error => {
                        console.error('HTTP Request Error:', error.message);
                    });

            }
        }
    } catch (err) {
        console.log("if statement failed: ", err);
    }




    // const json_data = fs.writeFileSync('')

});

async function unix_time(timestatmp) {
    let date = new Date(timestatmp * 1000);
    const hours = date.getHours();
    const min = date.getMinutes();
    const sec = date.getSeconds();
    const time = hours + ':' + min + ':' + sec;
    // date
    const day = date.getDay();
    const month = date.getMonth();
    const year = date.getFullYear();
    return [time, day + '/' + month + '/' + year];
}

// async function write_data(contact_info) {
//     try {
//         if (fs.existsSync(file)) {
//             const get_data = fs.readFileSync('database/database.json', 'utf8');
//             const json_content = JSON.parse(get_data);


//             json_content.push(contact_info);
//             const new_json = JSON.stringify(json_content, null, 2);
//             fs.writeFileSync(file, new_json);

//             console.log("Data pushed without a problem");
//         }
//         else {
//             const first_json = JSON.stringify([contact_info], null, 2);
//             fs.writeFileSync(file, first_json);

//             console.log("File created and data addded successfully!");
//         }
//     } catch (err) {
//         console.error("Failed: ", err);
//     }

// }


client.initialize();
