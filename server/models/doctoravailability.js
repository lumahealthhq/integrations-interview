'use strict';
module.exports = (sequelize, DataTypes) => {
  const DoctorAvailability = sequelize.define('DoctorAvailability', {
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
    avail_date: {
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
    }
  }, {});
  DoctorAvailability.associate = function(models) {
    // associations can be defined here
  };
  return DoctorAvailability;
};