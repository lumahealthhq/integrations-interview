import { Sequelize } from 'sequelize';

const user = {
    firstName: Sequelize.STRING,
    lastName: Sequelize.STRING,
    email: {type: Sequelize.STRING, unique: true},
    mobile: {type: Sequelize.STRING, unique: true}
};

export default user;