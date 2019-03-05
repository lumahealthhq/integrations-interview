'use strict';
module.exports = (sequelize, DataTypes) => {
  const Appointment = sequelize.define('Appointment', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    doctor_id: {
      allowNull: false,        
      type: DataTypes.INTEGER,
      references: {
        model: 'Doctor',
        key: 'id',
        as: 'doctor_id',
      }
    },
    patient_id: {
      allowNull: false,                
      type: DataTypes.INTEGER,
      references: {
        model: 'Patient',
        key: 'id',
        as: 'patient_id',
      }
    },
    appt_date: {
      allowNull: false,        
      type: DataTypes.DATEONLY
    },
    start_time: {
      allowNull: false,        
      type: DataTypes.TIME
    },
    end_time: {
      allowNull: false,        
      type: DataTypes.TIME
    },
    duration: {
      allowNull: false,        
      type: DataTypes.INTEGER
    },
    cancelled: {
      type: DataTypes.BOOLEAN
    }
  }, {});
  Appointment.associate = function(models) {
    // associations can be defined here
  };
  return Appointment;
};