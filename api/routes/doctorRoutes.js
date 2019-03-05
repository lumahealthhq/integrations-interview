'use strict';
module.exports = function(app) {
    var doctors = require('../controllers/doctorController');

    // Doctor Routes
    app.route('/doctors')
        .get(doctors.list_all_doctors)
        .post(doctors.add_a_doctor);


    app.route('/doctors/:docId')
        .get(doctors.get_a_doctor)
        .patch(doctors.update_a_doctor)
        .delete(doctors.delete_a_doctor);
};
