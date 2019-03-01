import { Sequelize } from 'sequelize';

import sequelize from '../db';

const Appointment = sequelize.define('appointment', {
    startAt: Sequelize.DATE,
    endAt: Sequelize.DATE,
    canceled: Sequelize.TINYINT,
    canceledAt: Sequelize.DATE,
    canceledReason: Sequelize.TEXT
}, {timestamps: true});

export default Appointment;