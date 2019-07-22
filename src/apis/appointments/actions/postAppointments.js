import moment from "moment";
import { checkWorkingDays } from '../services/doctorService';
import { createAppointment } from '../services/appointmentService';

/**
 * creates a appointment
 * @param {*} router
 */
export default function (router) {
  router.post('/appointments', async (req, res) => {
    try {
      const { patientId, doctorId, at } = req.body;
      const appointmentTime = moment(`${at.date} ${at.time}`);
      const appointmentWeekday = moment.weekdays(appointmentTime.day());
      const workingOnDayHour = await checkWorkingDays(doctorId, {
        day: appointmentWeekday,
        time: at.time,
      });
      if (workingOnDayHour === false) {
        throw new Error(`Doctor not working on ${appointmentWeekday} at ${at.time}`);
      }
      const appointment = await createAppointment(doctorId, patientId, appointmentTime);
      return res
        .status(201)
        .json(appointment);
    } catch (err) {
      console.log(err);
      return res.status(422).json({
        message: err.message || err
      });
    }
  });
}