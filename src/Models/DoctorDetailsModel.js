var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');

const Schema = mongoose.Schema;

var DoctorDetailsSchema = new Schema({
    Doctor_email: {
      type: String,
      required: true,
      unique: true
    },
    F_name: {
      type: String
    },
    L_name: {
      type: String
    },
    Speciality: {
      type: String,
      required: 'Enter a Speciality'
    },
    Availabilty: [{
      Day: Date,
      Available: String
    }]
});

DoctorDetailsSchema.plugin(uniqueValidator, {message: 'is already taken'});

DoctorDetailsSchema.methods.toJSONFor = function(){
    return {
        Doctor_email: this.Doctor_email,
        F_name: this.F_name,
        L_name: this.L_name,
        Speciality: this.Speciality,
        Availabilty: this.Availabilty
    };
  };
  
mongoose.model('Doctor_Detail', DoctorDetailsSchema);