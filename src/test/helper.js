import sequelize from '../db';

before(async () => {
    for (let model of Object.values(sequelize.models)) {
        await model.drop({force: true});
    }
});