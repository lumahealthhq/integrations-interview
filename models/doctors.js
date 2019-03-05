var mongoose = require('mongoose');


var availabilityContent = mongoose.Schema({
    date : {
        type : String
    },
    startTime:{
        type : String
    },
    endTime:{
        type : String
    }
})

var Doctors = mongoose.model('doctors',{
    firstName :{
        type : String
    },
    lastName : {
        type : String
    },
    email : {
        type : String,
        unique : true
    },
    phoneNumber :{
        type : Number
    },
    availability : [availabilityContent]
    
});

module.exports = {Doctors};