import { Sequelize } from 'sequelize';
import sequelize from '../db';

const Schedule = sequelize.define('schedule', {
    availableFrom: {type: Sequelize.DATE, allowNull: false},
    availableTo: {type: Sequelize.DATE, allowNull: false},
}, {timestamps: true});

export default Schedule;