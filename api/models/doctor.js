'use strict';

var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var doctorSchema = new Schema({
    name: {
        type: String,
        required: 'Value for name field is required',
        unique: true
    },
    workingHours: [
        {
            date: Date,
            startTime: Number,
            endTime: Number
        }
    ],
}, {
    timestamps: {
        updated_at: {
            type: Date,
            default: Date.now
        }
    }
});

var Doctors = mongoose.model('Doctors', doctorSchema);

module.exports = Doctors;
