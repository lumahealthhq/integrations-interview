
const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');


const doctorsRoutes = require('./api/routes/doctors');
const patientRoutes = require('./api/routes/patient');
const appointmentRoutes = require('./api/routes/appointments');

mongoose.connect('mongodb://vrajesh:Priyanka@cluster0-shard-00-00-myouf.mongodb.net:27017,cluster0-shard-00-01-myouf.mongodb.net:27017,cluster0-shard-00-02-myouf.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true', { useNewUrlParser: true });

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.use((req , res, next)=>{
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers",
      "Origin,X-Requested-With,Content-Type,Accept,Authorization");
  if(req.method === 'OPTIONS'){
    res.header('Access-Control-Allow-Methods', 'PUT,POST,PATCH,DELETE,GET');
    return res.status(200).json({});
  }
  next();
});

app.use('/doctors',doctorsRoutes);
app.use('/patients',patientRoutes);
app.use('/appointments',appointmentRoutes);
/*app.use((req , res, next)=>{
    res.status(200).json({
        message: 'It works'
    });
});*/

app.use((req,res,next)=>{
  const error = new Error('Not Found');
  error.status = 404;
  next(error);
});

app.use((error,req,res,next)=>{
  res.status(error.status || 500);
  res.json({
    error:{
      message : error.message
    }
  });
});

module.exports = app;