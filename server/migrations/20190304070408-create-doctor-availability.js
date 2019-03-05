'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('DoctorAvailabilities', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      doctor_id: {
        allowNull: false,        
        type: Sequelize.INTEGER,
        references: {
          model: 'Doctors',
          key: 'doctor_id',
          as: 'doctor_id',
        }
      },
      avail_date: {
        type: Sequelize.DATEONLY
      },
      start_time: {
        type: Sequelize.TIME
      },
      end_time: {
        type: Sequelize.TIME
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('DoctorAvailabilities');
  }
};