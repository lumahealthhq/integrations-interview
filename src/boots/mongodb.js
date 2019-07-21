import config from 'config';
import mongoose from 'mongoose';
import { setApiDb } from 'core/db'

/**
 * load mongodb
 */
export default async (api) => {
  const { mongodb } = config.get(api);
  if (mongodb) {
    const db = mongoose.createConnection(mongodb);
    db.on('error', () => console.error('connection error:'));
    db.once('open', () => {
      console.log(`MongoDb connected ${mongodb}`);
    });
    setApiDb(api, db);
  }
}
