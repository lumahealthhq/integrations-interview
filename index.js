import express from "express";
import bodyParser from "body-parser";
import db from "./models";
import getallDoctors from "./routes/doctors";
import WorkingHours from "./routes/workingHours";
import Schedule from "./routes/bookAppointments";
import PatientDetails from "./routes/getPatient";
const app = express();
const PORT = process.env.PORT || 8080;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

getallDoctors(app);
WorkingHours(app);
Schedule(app);
PatientDetails(app);

db.sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server listening on PORT ${PORT}`);
  });
});

export default app;
