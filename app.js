const express = require('express');
const bodyParser = require('body-parser');
const doctorRoutes = require('./routes/doctor.route');
const appointmentRoutes = require('./routes/appointment.route');
const mongoose = require('mongoose');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// routes
app.use('/doctors', doctorRoutes);
app.use('/appointments', appointmentRoutes);

// setting up the connection to mongoose
const server = '127.0.0.1:27017',
    database = 'lumahealth';
mongoose.connect(`mongodb://${server}/${database}`, {useNewUrlParser: true, useFindAndModify: false});
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'mongoDB connection error:'));
db.once('open', _ => {
    console.log("Connected to mongoDB!");
});

// server
let port = 1234;
app.listen(port, _ => {
    console.log(`Server is up and running on port number ${port}`);
});

module.exports = app;