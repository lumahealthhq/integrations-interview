const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose')

const workhrsRoutes = require('./api/routes/workinghours');
const bookingRoutes = require('./api/routes/bookinghours');

const createDocHours = require('./api/routes/createUpdateDocHours');

const updateDocHours = require('./api/routes/createUpdateDocHours');

//connecting mongoose
mongoose.connect('mongodb://lumaAdmin:'+process.env.MONGO_ATLAS_PW+'@lumacluster-shard-00-00-w5xvh.mongodb.net:27017,lumacluster-shard-00-01-w5xvh.mongodb.net:27017,lumacluster-shard-00-02-w5xvh.mongodb.net:27017/test?ssl=true&replicaSet=LumaCluster-shard-0&authSource=admin&retryWrites=true');


app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))

app.use((req,res,next)=>{
    res.header('Access-Control-Allow-Origin','*');
    res.header('Access-Control-Allow-Headers','Origin, X-Requested-With, Content-Type, Accept, Authorization');
    if(req.method==='OPTIONS'){
        res.header('Access-Control-Allow-Origin', 'PUT,POST,PATCH,DELETE, GET');
        return res.status(200).json({});
    }
    next();
});


app.use('/workinghours',workhrsRoutes);
app.use('/bookinghours',bookingRoutes);
app.use('/createDocHours',createDocHours);
app.use('/updateDocHours',updateDocHours);

//handle no valid request
app.use((res,req,next) => {
    const error = new Error('not valid request');
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error:{
            message: error.message
        }
    });
});


module.exports = app;
