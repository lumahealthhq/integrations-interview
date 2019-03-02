import Sequelize from 'sequelize';
import config from '../config';

const dbConfig = config.get("db");
// console.info(dbConfig)

const isTestEnv = () => process.env.NODE_ENV === 'test';

const sequelize = new Sequelize(dbConfig.name.default, 'root', 'devmysql', {
  host: dbConfig.host.default,
  dialect: "mysql",
  logging: !isTestEnv()
});

const syncOptions = {
  force: false
};

if (isTestEnv()) {
  syncOptions.force = true;
}

sequelize.sync(syncOptions);

export default sequelize;