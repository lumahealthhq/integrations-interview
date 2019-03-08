import db from "../models";

// get all working hours by doctor name
const getWorkingHours = app => {
  app.get("/api/doctor/:name", (req, res) => {
    db.working_hours
      .findAll({
        include: [
          {
            model: db.Doctor,
            where: {
              name: req.params.name
            }
          }
        ]
      })
      .then(result => {
        res.json(result);
      });
  });

  // create a working hours for a doctor
  //@todo: prevent dublicate entry
  app.post("/api/create/workinghours", (req, res) => {
    db.working_hours.create({
      date: req.body.date,
      start: req.body.start,
      to: req.body.end,
      DoctorId: req.body.doctor
    });
    res
      .status(200)
      .send({ message: "the working hours was added sucessfully" });
  });

  //update a doctor working hours
  // @todo: prevent dublicate entry
  app.put("/api/update/workinghours/:id", (req, res) => {
    db.working_hours
      .update(
        {
          date: req.body.date,
          start: req.body.start,
          to: req.body.end
        },
        {
          where: {
            DoctorId: {
              [db.Op.eq]: req.params.id
            }
          }
        }
      )
      .then(result => {
        res
          .status(200)
          .json({ message: `record was updated , effected row ${result}` });
      });
  });
};

export default getWorkingHours;
