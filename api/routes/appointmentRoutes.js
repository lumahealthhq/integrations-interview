'use strict';
module.exports = function(app) {
    var appointments = require('../controllers/appointmentController');

    // Appointment Routes
    app.route('/appointments')
        .get(appointments.list_all_appointments)
        .post(appointments.add_a_appointment);

    app.route('/appointments/:appointmentId')
        .get(appointments.get_a_appointment)
        .patch(appointments.update_a_appointment)
        .delete(appointments.delete_a_appointment);
};
