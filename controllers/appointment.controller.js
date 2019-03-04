const Appointment = require('../models/appointment.model');

exports.viewAllAppointments = (_, res) => {
    Appointment.find({}, (err, appointments) => {
        if (err) res.send(JSON.parse(`{"error": "Couldn't retrieve all the appointments."}`));
        else res.send(appointments);
    });
};

exports.viewAnAppointment = (req, res) => {
    Appointment.findById(req.params.id, (err, appointment) => {
        if (err || appointment == null) res.send(JSON.parse(`"error": "Couldn't find an appointment with id=${req.params.id}."`));
        else res.send(appointment);
    });
};

exports.bookAppointment = (doctor, start, end, day, res) => {
    let appointment = new Appointment({
        doctor: doctor,
        start: start,
        end: end,
        day: day
    });
    appointment.save(err => {
        if (err) res.status(404).send(JSON.parse(`"error": "Couldn\'t book an appointment."`));
        else res.send(appointment);
    });
};

