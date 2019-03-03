const express = require("express");
const router = express.Router();

const Appointment = require("../../models/Appointment");
const Doctor = require("../../models/Doctor");
const Patient = require("../../models/Patient");

// @route   GET api/appointment/:doctor_id
// @desc    Get all appointments for given doctor
router.get("/:doctor_id", (req, res) => {
  Appointment.find({ doctor: req.params.doctor_id })
    .then(appointments => res.json(appointments))
    .catch(err => res.status(404).json({ msg: "No appointments found" }));
});

// @route   POST api/appointment
// @desc    Create a doctor appointment
router.post("/", (req, res) => {
  const { doctor_id, patient_id, date, from, to } = req.body;

  Patient.findById(patient_id)
    .then(patient => {
      Doctor.findById(doctor_id)
        .then(doctor => {
          const docWorkHours = doctor.workinghours;
          const docDates = docWorkHours.map(item => item.date);

          if (docDates.includes(date)) {
            const i = docDates.indexOf(date);
            const appointmentFrom = new Date(date + "T" + from);
            const appointmentTo = new Date(date + "T" + to);
            const availableFrom = new Date(
              docWorkHours[i].date + "T" + docWorkHours[i].from
            );
            const availableTo = new Date(
              docWorkHours[i].date + "T" + docWorkHours[i].to
            );
            if (
              !(
                appointmentFrom >= availableFrom &&
                appointmentFrom <= availableTo &&
                (appointmentTo >= availableFrom && appointmentTo <= availableTo)
              )
            ) {
              return res.status(404).json({
                msg:
                  doctor.name + " doesn't have any working hours at that time"
              });
            }

            Appointment.find({ doctor: doctor_id })
              .then(appointments => {
                for (let j = 0; j < appointments.length; j++) {
                  const curr = appointments[j];
                  const startTime = new Date(curr.date + "T" + curr.from);
                  const endTime = new Date(curr.date + "T" + curr.to);

                  if (
                    (appointmentFrom >= startTime &&
                      appointmentFrom < endTime) ||
                    (appointmentTo > startTime && appointmentTo <= endTime)
                  ) {
                    return res.status(404).json({
                      msg:
                        "Time slot is already booked or is overlapping with another appointment"
                    });
                  }
                }

                new Appointment({
                  doctor: doctor_id,
                  patient: patient_id,
                  date,
                  from,
                  to
                })
                  .save()
                  .then(appointment => res.json(appointment))
                  .catch(err => res.status(404).json(err));
              })
              .catch(err =>
                res.status(404).json({ msg: "No appointments found" })
              );
          } else {
            res.status(404).json({
              msg:
                doctor.name + " doesn't have any working hours on entered date"
            });
          }
        })
        .catch(err =>
          res.status(404).json({ msg: "Entered doctor id doesn't exist" })
        );
    })
    .catch(err =>
      res.status(404).json({ msg: "Entered patient id doesn't exist" })
    );
});

module.exports = router;
