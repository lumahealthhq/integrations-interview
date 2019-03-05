'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Appointments', {
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
      patient_id: {
        allowNull: false,                
        type: Sequelize.INTEGER,
        references: {
          model: 'Patients',
          key: 'patient_id',
          as: 'patient_id',
        }
      },
      appt_date: {
        allowNull: false,        
        type: Sequelize.DATEONLY
      },
      start_time: {
        allowNull: false,        
        type: Sequelize.TIME
      },
      end_time: {
        allowNull: false,        
        type: Sequelize.TIME
      },
      duration: {
        allowNull: false,        
        type: Sequelize.INTEGER
      },
      cancelled: {
        type: Sequelize.BOOLEAN
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Appointments');
  }
};