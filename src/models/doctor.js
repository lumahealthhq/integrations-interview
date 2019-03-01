import user from './user';
import Schedule from './schedule';
import Appointment from './appointment';
import sequelize from '../db';

const Doctor = sequelize.define('doctor', {
    ...user
}, {timestamps: true});

Doctor.hasMany(Schedule);
Schedule.belongsTo(Doctor);

Doctor.hasMany(Appointment);
Appointment.belongsTo(Doctor);

export default Doctor;