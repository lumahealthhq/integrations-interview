var mongoose = require('mongoose');

var Appointments = mongoose.model('appointments',{
    doctorId :{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Doctors'
    },
    patientId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Patients'
    },
    appointmentDate : {
        type : String
    },
    aStartTime : {
        type : String
    },
    aEndTime : {
        type : String
    }
});

module.exports = {Appointments};