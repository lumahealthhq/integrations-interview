/* global */

const commonHandler = require("./route-common")
const express = require("express");
const router = express.Router();
const ScheduleController = require("../controllers/scheduleController");

//api to get all schedules data
router.get("/", (req, res) => {
  commonHandler(ScheduleController.getSchedule(), req, res);
});

//api to get a schedule by id
router.get("/:id", (req, res) => {
  commonHandler(ScheduleController.getScheduleById(req.params.id), req, res);
});

//api to create a schedule
router.post("/", (req, res) => {
  commonHandler(ScheduleController.addSchedule(req.body.from, req.body.to, req.body.details), req, res);
});

//api to update a schedule by id
router.post("/update", (req, res) => {
  commonHandler(ScheduleController.updateSchedule(req.body.id, req.body.from, req.body.to, req.body.details), req, res);
});

module.exports = router;
