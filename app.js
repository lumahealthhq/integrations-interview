const express = require("express");
const bodyParser = require("body-parser");
const app = express();

app.listen(3000, () => {
  console.log("Server running on port 3000.");
});

app.get('/', function (req, res) {
  console.log("Healthcheck passed.");
});

// database: setting up mongoose connection
const mongoose = require('mongoose');
let dev_db_url = '<ENTER URL HERE>';
let mongoDB = process.env.MONGODB_URI || dev_db_url;
mongoose.connect(mongoDB, { useNewUrlParser: true });
mongoose.Promise = global.Promise;
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use(bodyParser.json());

require('./models/patient.model');
require('./models/doctor.model');
require('./models/opening.model');

var patientRoutes = require('./routes/patient.route');
var doctorRoutes = require('./routes/doctor.route');
var openingsRoutes = require('./routes/opening.route');

app.use('/patients', patientRoutes);
app.use('/doctors', doctorRoutes);
app.use('/openings', openingsRoutes);


module.exports = app, db;