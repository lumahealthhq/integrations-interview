export default (sequelize, DataTypes) => {
  const WorkingHours = sequelize.define("working_hours", {
    date: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    start: {
      type: DataTypes.TIME,
      allowNull: false
    },
    to: {
      type: DataTypes.TIME,
      allowNull: true
    }
  });

  WorkingHours.associate = models => {
    WorkingHours.belongsToMany(models.Doctor, {
      through: { model: models.Patient }
    });
  };
  WorkingHours.associate = models => {
    // A Working Hours can't be created without a Doctor due to the foreign key constraint
    WorkingHours.belongsTo(models.Doctor, {
      foreignKey: {
        allowNull: false
      }
    });
  };

  return WorkingHours;
};
