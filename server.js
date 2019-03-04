const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const db = require("./config").mongoURI;
const doctor = require("./routes/api/doctor");
const patient = require("./routes/api/patient");
const appointment = require("./routes/api/appointment");
const tests = require("./routes/api/tests");

const app = express();

// Body Parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Connect to MongoDB
mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log("Connected"))
  .catch(err => console.log(err));

app.get("/", (req, res) => res.json({ success: true }));

// Routes
app.use("/api/doctor", doctor);
app.use("/api/patient", patient);
app.use("/api/appointment", appointment);
app.use("/api/tests", tests);

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Server running on port ${port}`));
