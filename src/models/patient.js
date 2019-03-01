import user from './user';
import sequelize from '../db';
import Appointment from './appointment';

const Patient = sequelize.define('patient',  {
    ...user
}, {timestamps: true});

Patient.hasMany(Appointment);
Appointment.belongsTo(Patient);

export default Patient;