const mongoose = require('mongoose');

const hoursSchema = mongoose.Schema({
    _id: mongoose.Types.ObjectId,
    docname: String,
    workdate: Date,
    startTime: Date,
    endTime: Date
});

module.exports = mongoose.model('DocHours', hoursSchema);
