var mongoose = require('mongoose');

mongoose.Promise = global.Promise;

mongoose.connect('mongodb://admin:admin123@ds349175.mlab.com:49175/luma_health?poolSize=20', {poolSize: 20});

module.exports = {mongoose};