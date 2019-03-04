const express = require('express'),
app = express(),
port = process.env.PORT || 3000,
mongoose = require('mongoose'),
Doctors = require('./api/models/doctor'),
Patients = require('./api/models/patient'),
Appointments = require('./api/models/appointment'),
bodyParser = require('body-parser'),
config = require('./config');

// mongoose instance connection url connection
mongoose.Promise = global.Promise;
if(process.env.NODE_ENV === 'test'){
  const Mockgoose = require('mockgoose').Mockgoose;
  const mockgoose = new Mockgoose(mongoose);

  mockgoose.prepareStorage()
  .then(() => {
    mongoose.connect(config.getDbConnectionString(), { useNewUrlParser: true });
  });
}else {
  mongoose.connect(config.getDbConnectionString(), { useNewUrlParser: true });
}

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var doctorRoutes = require('./api/routes/doctorRoutes');
var patientRoutes = require('./api/routes/patientRoutes');
var appointmentRoutes = require('./api/routes/appointmentRoutes');

doctorRoutes(app);
patientRoutes(app);
appointmentRoutes(app);

var server = app.listen(port, () => {
  console.log('App listening at port: %s', port);
});

module.exports = server;
