'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Patients', {
      patient_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      patient_firstname: {
        allowNull: false,        
        type: Sequelize.STRING
      },
      patient_lastname: {
        allowNull: false,        
        type: Sequelize.STRING
      },
      patient_email: {
        allowNull: false,        
        type: Sequelize.STRING
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Patients');
  }
};