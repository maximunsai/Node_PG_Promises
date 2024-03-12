const { Client } = require('pg');

const client = new Client({
    host :'localhost',
    user :'postgres',
    database: 'pDatabase',
    password: 'sai@4080',
    port: 5432
});

 client.connect();

module.exports = client;