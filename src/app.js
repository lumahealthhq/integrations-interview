import morgan from 'morgan';
import express from 'express';
import bodyParser from 'body-parser';

import cors from 'cors';
import bootstrap from './bootstrap';

// const router = promiseRouter();
const app = express()
  .use(cors())
  .use(bodyParser.json())
  .use(morgan('dev'))
  // .use('/api', router)
  .set('json spaces', 2);

// bootstrap app
bootstrap(app, [
  // apis
  'appointments',
]);

const server = app.listen(process.env.PORT || 3003, () => {
  console.log('Example app listening at port %s', server.address().port);
});

module.exports = app;
