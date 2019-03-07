var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');

const Schema = mongoose.Schema;

var PatientDetailsSchema = new Schema({
    Patient_phone: {
        type: Number,
        required: true,
        unique: true
      },
      F_name: {
        type: String
      },
      L_name: {
        type: String
      },
      Appointment_Dates: [{
        Date: Date,
        Doctor_email: String
      }]
});

PatientDetailsSchema.plugin(uniqueValidator, {message: 'is already taken'});

PatientDetailsSchema.methods.toJSONFor = function(){
    return {
        Patient_phone: this.Patient_phone,
        F_name: this.F_name,
        L_name: this.L_name,
        Appointment_Dates: this.Appointment_Dates
    };
  };

mongoose.model('Patient_Detail', PatientDetailsSchema);
