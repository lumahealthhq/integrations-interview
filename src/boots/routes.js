import fs from 'fs';
import path from 'path';
import promiseRouter from 'express-promise-router';
import { promisify } from 'util';

const readdir = promisify(fs.readdir);

/**
 * load routes
 */
export default async (dir, app, api) => {
  const router = promiseRouter();
  app.use(`/${api}/api`, router);
  try {
    const files = await readdir(`${dir}/apis/${api}/actions`);
    files
      .filter(jsFiles)
      .map((file) => {
        require(`../apis/${api}/actions/${file}`).default(router);
      });
  } catch (err) {
    throw new Error(err);
  }
}

const jsFiles = (filename) => path.extname(filename) === '.js';
