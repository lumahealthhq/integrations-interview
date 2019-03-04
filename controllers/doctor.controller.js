const Doctor = require('../models/doctor.model');
const moment = require('moment');
const defaultHours = require('../data/defaulthours.json')
const appointmentController = require('../controllers/appointment.controller')

exports.getAvailableHours = (req, res) => {
    Doctor.findById(req.params.id, (err, doctor) => {
        if (err || doctor == null) res.send(JSON.parse(`{"error": "Couldn't find a doctor with id=${req.params.id}."}`));
        else res.send(JSON.parse(doctor.availableHours));
    });
};

exports.getAll = (_, res) => {
    Doctor.find({}, (err, doctors) => {
        if (err) res.status(404).send(JSON.parse('{"error": "Couldn\'t retrive all the doctors."}'));
        else res.send(doctors);
    });
};


let bookAppointment = (req, res, availableHours) => {
    let start = moment(req.body.start, "HH:mm"),
        end = moment(req.body.end, "HH:mm"),
        id = req.body.id,
        day = req.body.day;

    let availableHoursForDay = availableHours[day],
        startSlotIndex = availableHoursForDay.findIndex(slot => start.isSameOrAfter(moment(slot["Start"], "HH:mm")) && start.isBefore(moment(slot["Finish"], "HH:mm"))),
        endSlotIndex = availableHoursForDay.findIndex(slot => end.isAfter(moment(slot["Start"], "HH:mm")) && end.isSameOrBefore(moment(slot["Finish"], "HH:mm")));

    if (startSlotIndex === -1 || endSlotIndex === -1 || startSlotIndex !== endSlotIndex) {
        res.send(JSON.parse('{"error": "Sorry, couldn\'t book an appointment."}'));
        return;
    }

    startSlotIndexFinish = availableHoursForDay[startSlotIndex]["Finish"];
    availableHoursForDay[startSlotIndex]["Finish"] = req.body.start;
    availableHoursForDay.splice(startSlotIndex+1, 0, {"Start": req.body.end, "Finish": startSlotIndexFinish});

    Doctor.findByIdAndUpdate(id, {$set: {availableHours: JSON.stringify(availableHours)}}, (err, doctor) => {
        if (err) res.send(JSON.parse(`{"error": "Sorry, couldn't book an appointment with ${doctor.name} this ${day} from ${req.body.start} to ${req.body.end}."}`));
        else appointmentController.bookAppointment(doctor.name, req.body.start, req.body.end, day, res);
    });
};

exports.bookAppointment = (req, res) => {
    Doctor.findById(req.body.id, (err, doctor) => {
        if (err || doctor == null) res.send({"error": `Couldn't find a doctor with id=${req.body.id}.`});
        else bookAppointment(req, res, JSON.parse(doctor.availableHours));
    });
};

exports.addDoctor = (req, res) => {
    if (!req.body.name) {
        res.send({"error": "Couldn\'t add a doctor without a name."});
        return;
    }
    let doctor = new Doctor({
        name: req.body.name,
        availableHours: JSON.stringify(defaultHours)
    });
    doctor.save(err => {
        if (err) res.status(404).send(JSON.parse('{"error": "Couldn\'t add the doctor."}'));
        else res.send(doctor);
    });
};
