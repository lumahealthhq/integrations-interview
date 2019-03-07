var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');
// var slug = require('slug');

const Schema = mongoose.Schema;

var  AppointmentDetailsSchema = new Schema({
      A_Date: {
        type: Date,
        default: Date.now
      },
      Doctor_email: {
        type: String,
        required: true
      },
      Patient_phone: {
        type: Number,
        required: true
      }
});

AppointmentDetailsSchema.methods.toJSONFor = function(){
    return {
        A_Date: this.A_Date,
        Doctor_email: this.Doctor_email,
        Patient_phone: this.Patient_phone
    };
  };

mongoose.model('Appointment_Detail', AppointmentDetailsSchema);