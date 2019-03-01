import Sequelize from 'sequelize';
import config from '../config';

const sequelize = new Sequelize('luma', 'root', 'devmysql', { 
  host: config.get("db").host,
  dialect: 'mysql'
});

sequelize.sync();

export default sequelize;