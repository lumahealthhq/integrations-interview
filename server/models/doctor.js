'use strict';
module.exports = (sequelize, DataTypes) => {
  const Doctor = sequelize.define('Doctor', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    doctor_firstname: {
      type: DataTypes.STRING,
    },
    doctor_lastname: {
      type: DataTypes.STRING,
    },
    doctor_email: {
      type: DataTypes.STRING,
    },
  }, {});
  Doctor.associate = function(models) {
    // associations can be defined here
  };
  return Doctor;
};