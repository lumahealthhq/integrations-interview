const mongoose = require('mongoose');

const appointmentSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    doctor:{type:mongoose.Schema.Types.ObjectId,ref:'Doctor',required:true},
    patient:{type:mongoose.Schema.Types.ObjectId,ref:'Patient',required:true},
    date:{type:String, required:true},
    slot:{type:String, required:true}
});
module.exports = mongoose.model('Appointment', appointmentSchema);

