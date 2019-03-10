
var nextPatientId = 1;

var patientList = [];


var patientDao = {

  //Patient model
  Patient: function(firstName, lastName){
    this.firstName = firstName;
    this.lastName = lastName;
    this.id = nextPatientId;
    nextPatientId = nextPatientId+1;
  },
  getList: function(callback){

      return callback(patientList);
  },
  getPatient: function(id, callback){

      var patient;
      patientList.forEach(function(pat){
          if(id == pat.id){
             patient = pat;
          }
      });
      console.log("Going to return patient::"+patient.firstName);
      if(callback){
          callback(patient);
      }
  },
  addPatient: function(request, callback){

     var patient = new this.Patient(request.firstName, request.lastName);
     patientList.push(patient);
     console.log("List after adding");
     console.log(patientList);

     callback(patient);
  }
}
module.exports = patientDao;
