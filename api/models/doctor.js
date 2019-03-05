const mongoose = require('mongoose');

const DoctorSchema = mongoose.Schema({
    _id : mongoose.Schema.Types.ObjectId,
    name : {type:String, required:true},
    address: {
        city:{type: String,required:true},
        state:{type: String,required:true}
    },
    availability:[{
        date: {type: String},
        hours: {   // can be multiple
            startTime: {type: String},
            endTime: {type: String}
        },
        slots: []
    }]

});
module.exports = mongoose.model('Doctor', DoctorSchema);

