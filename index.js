const express = require('express');
const bodyParser = require('body-parser');

const config = require('./config.json');
const workingHours = require('./routes/workinghour');
const appointments = require('./routes/appointment');

const app = express();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/workingHours', workingHours);
app.use('/appointments', appointments);

app.listen(config.PORT, "0.0.0.0");
console.log('we live on ' + config.PORT);

module.exports = app;