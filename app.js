// Require Modules
var http = require('http'),
    path = require('path'),
    bodyParser = require('body-parser'),
    express = require('express'),
    mongoose = require('mongoose'),
    cors = require('cors');
    let morgan = require('morgan');


/*
 *
 * Initialization 
 *
 */ 
const app = express();
app.use(cors());


/*
 *
 * MiddelWare 
 *
 */
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

/*
 * Routes
 */
let routes = require('./src/Routes/appointmentSchedulerRoutes');
app.post('/AddDoctor/', routes);
app.get('/getWorkingHoursDoctor/:Email', routes);
app.post('/createUpdateWorkingHoursDoctor/', routes);
app.post('/bookWorkingHoursDoctor/', routes);

/*
 * UnHandeled Routes
 */
app.use((req, res) => {
  res.statusCode = 404;
  res.send({
      errcode: '99',
      errmessage: 'Are you lost?',
      result: null
  });
});

/*
 * Broken Things
 */
app.use((err, req, res) => {
  console.error(err.stack);
  res.statusCode = 500;
  res.send({
      errcode: '99',
      errmessage: 'Something broke!',
      result: null
  });
});


const server = '127.0.0.1:27017'; // REPLACE WITH YOUR DB SERVER
const database = 'AppointmentScheduler';      // REPLACE WITH YOUR DB NAME

mongoose.Promise = global.Promise;
mongoose.connect(`mongodb://${server}/${database}`)
       .then(() => {
         console.log('Database connection successful')
       })
       .catch(err => {
         console.error('Database connection error')
       });

/*
 * Server Listing
 */
app.listen(process.env.PORT || 3000, () => {
  console.log('app is started at ', process.env.PORT || 3000);
});


module.exports = app // For Testing
