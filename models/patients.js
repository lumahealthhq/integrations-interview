var mongoose = require('mongoose');

var Patients = mongoose.model('patients',{
    firstName :{
        type : String
    },
    lastName : {
        type : String
    },
    email : {
        type : String,
        unique : true
    }
});

module.exports = {Patients};