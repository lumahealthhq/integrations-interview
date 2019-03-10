
var patientDao = require('../dao/patient-dao.js');

var patientService = {

    getList: function(callback){

        patientDao.getList(function(patientList){
            callback(patientList);
        });
    },
    getPatient:function(id, callback){

      patientDao.getPatient(id,function(patient){
          callback(patient);
      });
    },
    addPatient: function(request, callback){

        patientDao.addPatient(request, function(){
            callback("Success");
        });
    }
}

module.exports = patientService;
