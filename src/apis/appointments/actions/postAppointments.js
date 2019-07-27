import moment from "moment";
import doctorService from '../services/doctorService';
import appointmentService from '../services/appointmentService';
import { Appointment, Doctor } from '../models';

/**
 * creates a appointment
 * @param {*} router
 */
export default function (router) {
  router.post('/appointments', async (req, res) => {
    try {
      const { patientId, doctorId, at } = req.body;
      
      const _appointmentService = appointmentService(Appointment);
      const _doctorService = doctorService(Doctor);

      const dateAndTime = new Date(`${at.date} ${at.time.split(' ')[0]}:00 ${at.time.split(' ')[1]}`);
      const appointmentTime = moment(dateAndTime);
      const appointmentWeekday = moment.weekdays(appointmentTime.day());

      const workingOnDayHour = await _doctorService.checkWorkingDays(doctorId, {
        day: appointmentWeekday,
        time: at.time,
      });

      if (workingOnDayHour === false) {
        throw new Error(`Doctor not working on ${appointmentWeekday} at ${at.time}`);
      }

      const appointment = await _appointmentService.createAppointment(doctorId, patientId, appointmentTime);

      return res
        .status(201)
        .json(appointment);

    } catch (err) {
      return res.status(422).json({
        message: err.message || err
      });
    }
  });
}