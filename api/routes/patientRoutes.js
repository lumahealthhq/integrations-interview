'use strict';
module.exports = function(app) {
  var patients = require('../controllers/patientController');

  // Patient Routes
  app.route('/patients')
    .get(patients.list_all_patients)
    .post(patients.add_a_patient);


  app.route('/patients/:patientId')
    .get(patients.get_a_patient)
    .patch(patients.update_a_patient)
    .delete(patients.delete_a_patient);
};
