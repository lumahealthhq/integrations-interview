export default (sequelize, DataTypes) => {
  const Patient = sequelize.define("patient", {
    name: DataTypes.STRING
  });

  Patient.associate = models => {
    Patient.belongsToMany(models.Doctor, {
      through: { model: models.appointments }
    });
  };

  return Patient;
};
