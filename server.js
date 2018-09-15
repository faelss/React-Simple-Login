require('dotenv').config({path:'.env'});
const route = require('./src/server/route/routes.js');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

let port = process.env.APP_SERVER_PORT || 8000;

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

route(app);

app.listen(port , () => {
    console.log('Servidor escutando na porta: ' + port);
});
