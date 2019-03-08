export default (sequelize, DataTypes) => {
  const Doctor = sequelize.define("Doctor", {
    name: DataTypes.STRING,
    onleave: DataTypes.BOOLEAN
  });
  return Doctor;
};
