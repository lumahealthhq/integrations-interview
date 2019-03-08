export default (sequelize, DataTypes) => {
  const Appointments = sequelize.define("appointments", {
    appointment_date: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    appointment_start_time: {
      type: DataTypes.TIME,
      allowNull: false
    },
    appointment_end_time: {
      type: DataTypes.TIME,
      allowNull: false
    }
  });

  Appointments.associate = models => {
    Appointments.belongsToMany(models.Doctor, {
      through: { model: models.Patient }
    });
  };

  Appointments.associate = models => {
    // A appointment can't be created without a Doctor due to the foreign key constraint
    Appointments.belongsTo(models.Doctor, {
      foreignKey: {
        allowNull: false
      }
    });
  };

  return Appointments;
};
