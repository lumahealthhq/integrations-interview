import moment from 'moment';
import find from 'lodash/find';
import isEmpty from 'lodash/isEmpty';

export default (Doctor) => {
  return {
    /**
     * Check if doctor works at date
     * @param {*} doctorId 
     * @param {*} at 
     */
    checkWorkingDays : async (doctorId, at) => {
      try {
        const doctor = await Doctor.findById(doctorId);
        const { workingDays } = doctor;
        if (isEmpty(workingDays) === false) {
          const timeAt = moment(at.time, 'hh:mm A');
          const workDay = find(workingDays, (w) => w.weekDay === at.day);
          if (workDay) {
            const { times } = workDay;
            const timeBetween = find(times, (time) => {
              let beforeTime = moment(time.start, 'hh:mm A');
              let afterTime = moment(time.end, 'hh:mm A');
              return timeAt.isBetween(beforeTime, afterTime);
            });
            return isEmpty(timeBetween) === false;
          } else {
            return false;
          }
        }
      } catch (err) {
        console.log(err);
      }
    }
  }
}
