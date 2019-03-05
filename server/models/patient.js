'use strict';
module.exports = (sequelize, DataTypes) => {
  const Patient = sequelize.define('Patient', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    patient_firstname: {
      type: DataTypes.STRING,
    },
    patient_lastname: {
      type: DataTypes.STRING,
    },
    patient_email: {
      type: DataTypes.STRING,
    },
  }, {});

  Patient.associate = function(models) {
    // associations can be defined here
  };
  return Patient;
};