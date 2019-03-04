const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Type of doctor's schedule
const schedule = new Schema({
  scheduleId :              {type: Number, required: true, unique: true},
  from :                    {type: Number, required: true},
  to :                      {type: Number, required: true},
  details :                 {type: String, required: false},
  updatedAt :               {type: Date, required: false}
});

schedule.statics.getSchedule = function() {
  return new Promise((resolve, reject) => {
    this.find({}).sort({"_id": 1}).then((schedules) => {
      resolve(schedules);
    })
  });
}

schedule.statics.getScheduleById = function(id) {
  return new Promise((resolve, reject) => {
    this.find({scheduleId: id}).then((schedule) => {
      resolve(schedule);
    })
  });
}

schedule.statics.createSchedule = function(from, to, details) { 
  return new Promise ((resolve, reject) => {
    this.find({})
      .sort({ scheduleId: -1 }).exec((err, sche) => {
        if (err) throw err;
        const newSchedule = new this();
        newSchedule.scheduleId = typeof sche[0] === "undefined" ? 0 : parseInt(sche[0].scheduleId)+1;
        newSchedule.from = from;
        newSchedule.to = to;
        newSchedule.details = details;
        newSchedule.updatedAt = new Date().toString();
        // save the message
        newSchedule.save()
      .then((schedule) => {
        resolve(schedule);
      })
    });
  });
}

schedule.statics.updateSchedule = function(id, from, to, details) {
  return new Promise((resolve, reject) => {
    this.updateOne({scheduleId: id}, {$set: { from: from, to: to, details : details} }).then((schedule) => {
      resolve(schedule);
    })
  });
}

const scheduleModel = mongoose.model('schedule', schedule);
module.exports = scheduleModel;

