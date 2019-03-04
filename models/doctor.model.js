const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let DoctorSchema = new Schema({
    name: {type: String, required: true, max: 100},
    availableHours: {type: String, required: true}
});

module.exports = mongoose.model('Doctor', DoctorSchema);