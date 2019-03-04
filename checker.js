const BaseJoi = require("joi");
const Extension = require("joi-date-extensions");
const Joi = BaseJoi.extend(Extension);

// the input hour is in the format of 08:13 (24 hour format), meaning from 8:00
// to 13:00
const time = /^(0[0-9]|1[0-9]|2[0-3]):(0[0-9]|1[0-9]|2[0-3])$/;

// check the data input to create doctor is valid (in the format of 2019-03-04)
function checkValidDoctor(input) {
  const schemaHour = Joi.object().pattern(
    Joi.date().format("YYYY-MM-DD"),
    Joi.string().regex(time)
  );
  const schemaDoctor = Joi.object({
    name: Joi.string(),
    workingHours: schemaHour
  });
  const result = Joi.validate(input, schemaDoctor);
  if (result.error) {
    return false;
  }
  return true;
}

// check the data to create appointment is valid
function checkValidAppointments(input) {
  const schema = {
    patientName: Joi.string(),
    doctorName: Joi.string(),
    appointDate: Joi.date().format("YYYY-MM-DD"),
    appointTime: Joi.string().regex(time)
  };
  const result = Joi.validate(input, schema);
  if (result.error) {
    return false;
  }
  return true;
}

// check whether the time is in doctor's working time
function isWork(input, workingHours) {
  for (workingDate in workingHours) {
    if (input.appointDate === workingDate) {
      const inputTime = input.appointTime.split(":");
      const workTime = workingHours[workingDate].split(":");
      if (
        parseInt(inputTime[0]) >= parseInt(workTime[0]) &&
        parseInt(inputTime[1]) <= parseInt(workTime[1])
      ) {
        return true;
      }
    }
  }
  return false;
}

// check whether the time is open
function isOverLap(input, appointments) {
  for (appointment of appointments) {
    if (input.appointDate == appointment.appointDate) {
      const inputTime = input.appointTime.split(":");
      const appointTime = appointment.appointTime.split(":");
      const inputZero = parseInt(inputTime[0]);
      const inputOne = parseInt(inputTime[1]);
      const appZero = parseInt(appointTime[0]);
      const appOne = parseInt(appointTime[1]);
      if (
        !(
          (inputOne <= appZero && inputZero < inputOne) ||
          (inputZero >= appOne && inputZero < inputOne)
        )
      ) {
        return true;
      }
    }
  }
  return false;
}

module.exports = {
  checkValidDoctor,
  checkValidAppointments,
  isWork,
  isOverLap
};
