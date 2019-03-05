'use strict';

var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var patientSchema = new Schema({
    name: {
        type: String,
        required: 'Value for name field is required'
    },
}, {
    timestamps: {
        updated_at: {
            type: Date,
            default: Date.now
        }
    }
});

var Patients = mongoose.model('Patients', patientSchema);

module.exports = Patients;
