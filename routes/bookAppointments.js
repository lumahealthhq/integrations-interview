import db from "../models";

const Schedule = app => {
  app.post("/api/schedule", (req, res) => {
    db.appointments.create({
      appointment_date: req.body.date,
      appointment_start_time: req.body.start,
      appointment_end_time: req.body.end,
      DoctorId: req.body.doctor,
      patientId: req.body.patient
    });
    res
      .status(200)
      .send({ message: "appointment was scheduled your are all set" });
  });

  // todo: needs to work on alret no associte to appointment
  app.get("/api/all/appointments", (req, res) => {
    db.appointments.findAll({}).then(result => {
      res.json(result);
    });
  });
};

export default Schedule;
