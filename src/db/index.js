import Sequelize from 'sequelize';
import config from '../config';

const dbConfig = config.get("db");

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

sequelize.sync(syncOptions)
    .then(() => {
        console.info("Sequelize sync enabled...");
    })
    .catch((err) => {
        console.error(err);
    });

export default sequelize;