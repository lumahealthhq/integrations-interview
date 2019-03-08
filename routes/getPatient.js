import db from "../models";

//get all patients
const getPatient = app => {
  app.get("/api/get/all/patient", (req, res) => {
    db.patient.findAll({}).then(result => {
      res.json(result);
    });
  });

  // get patient appointment info by doctor name
  app.get("/api/patient/doc/:name", (req, res) => {
    console.log(req.params);
    db.patient
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
};

export default getPatient;
