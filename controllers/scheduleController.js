class scheduleController {

  static get scheduleModel () {
    return global.ScheduleModel
  }

  static getSchedule() {
    return this.scheduleModel.getSchedule()
      .then((schedules) => ({statusCode: 200, result: schedules}));
  }

  static getScheduleById(id) {
    return this.scheduleModel.getScheduleById(id)
      .then((schedule) => ({statusCode: 200, result: schedule}));
  }

  static addSchedule(from, to, details) {
    return this.scheduleModel.createSchedule(from, to, details)
    .then((schedule) => ({statusCode: 201, result: {objectId: schedule._id, scheduleId: schedule.scheduleId, from: schedule.from, to: schedule.to }}))
      .catch((err) => {
        console.log(err)
        if(err.statusCode) {
          return Promise.resolve({statusCode: err.statusCode, result: err.result})
        } else {
          return Promise.resolve({statusCode: 400, result: err})
        }
      });

  }

  static updateSchedule(id, from, to, details) {
    return this.scheduleModel.updateSchedule(id, from, to, details)
    .then((schedule) => ({statusCode: 201, result: {objectId: schedule._id, scheduleId: schedule.scheduleId, from: schedule.from, to: schedule.to }}))
      .catch((err) => {
        console.log(err)
        if(err.statusCode) {
          return Promise.resolve({statusCode: err.statusCode, result: err.result})
        } else {
          return Promise.resolve({statusCode: 400, result: err})
        }
      });

  }

}
module.exports = scheduleController;
