const express = require('express');
const axios = require('axios');
const pug = require('pug');
const dotenv = require('dotenv');

dotenv.config();
const app = express();
app.set('view engine', 'pug'); // Set the view engine to use Pug

const compiledFunction = pug.compileFile('./views/homepage.pug');

const private_app_token = process.env.PRIVATE_APP_TOKEN;

app.get('/homepage', async (req, res) => {
    const companiesEndpoint = 'https://api.hubspot.com/crm/v3/objects/companies'; 
    const contactsEndpoint = 'https://api.hubspot.com/crm/v3/objects/contacts';
    const headers = {
        Authorization: `Bearer ${private_app_token}`,
        'Content-Type': 'application/json'
    }
    try {
        const response = await axios.get(contactsEndpoint, { headers });
        const contactsData = response.data;
        const response2 = await axios.get(companiesEndpoint, { headers });
        const companiesData = response2.data;

        console.log(contactsData, companiesData);
        res.render('homepage', { title: 'Hubspot Test', message: 'Contact and Company', contacts: contactsData, companies: companiesData  });
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});
app.get('/company', async (req, res) => {
    const companiesEndpoint = 'https://api.hubspot.com/crm/v3/objects/companies';
    const headers = {
        Authorization: `Bearer ${private_app_token}`,
        'Content-Type': 'application/json'
    }
    try {
        const response = await axios.get(companiesEndpoint, { headers });
        const companiesData = response.data;

        console.log(companiesData);
        res.render('company', { title: 'Hubspot Companies', companies: companiesData });
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});
app.get('/contact', async (req, res) => {
    const contactsEndpoint = 'https://api.hubspot.com/crm/v3/objects/contacts';
    const headers = {
        Authorization: `Bearer ${private_app_token}`,
        'Content-Type': 'application/json'
    }
    try {
        const response = await axios.get(contactsEndpoint, { headers });
        const contactsData = response.data;

        console.log(contactsData);
        res.render('contact', { title: 'TestJokast contact', message: 'Banby', contacts: contactsData });
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

app.listen(3000, () => console.log('Listening on http://localhost:3000'));
