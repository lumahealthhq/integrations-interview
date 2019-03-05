'use strict';

var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var appointmentSchema = new Schema({
    patientId: {
        required: 'Value for patient id field is required',
        type: String
    },
    docId: {
        required: 'Value for doctor id field is required',
        type: String
    },
    date: {
        required: 'Date for your appointment is required',
        type: Date
    },
    startTime: {
        required: 'Start time for the appointment is required',
        type: Number
    },
    endTime: {
        required: 'End time for the appointment is required',
        type: Number
    }
}, {
    timestamps: {
        updated_at: {
            type: Date,
            default: Date.now
        }
    }
});


var Appointments = mongoose.model('Appointments', appointmentSchema);

module.exports = Appointments;
