import db from "../models";

const getALL = app => {
  app.get("/api/doctors/all", (req, res) => {
    db.Doctor.findAll({}).then(result => {
      res.status(200).json(result);
    });
  });
};

export default getALL;
