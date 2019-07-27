import isEmpty from 'lodash/isEmpty';

/**
 * appointment service
 */
export default (Appointment) => {
  return {
    /**
     * Check if doctor has appointments at date
     * @param {*} doctorId 
     * @param {*} at 
     */
    createAppointment: async (doctorId, patientId, at) => {
      const hasAppointment = await Appointment.find({
        doctorId,
        at,
      });
      if (isEmpty(hasAppointment)) {
        const appointment = await Appointment.create({
          doctorId,
          patientId,
          at,
        });
        return appointment;
      }
      throw new Error(`Doctor is busy at time!`);
    }
  }
}
