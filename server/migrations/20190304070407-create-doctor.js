'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Doctors', {
      doctor_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      doctor_firstname: {
        type: Sequelize.STRING,
        allowNull: false,        
      },
      doctor_lastname: {
        type: Sequelize.STRING,
        allowNull: false,        
      },
      doctor_email: {
        type: Sequelize.STRING,
        allowNull: false,        
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Doctors');
  }
};