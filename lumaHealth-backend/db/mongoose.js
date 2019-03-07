var mongoose = require('mongoose');

mongoose.Promise = global.Promise;

mongoose.connect('mongodb://admin:admin123@ds157895.mlab.com:57895/hospital');



module.exports = {mongoose};