import dotenv from 'dotenv';
import series from 'async/series';
import moment from "moment";

import {

  loadMongoDb,
  loadSwaggerUi,
  loadRoutes,
  loadRabbitMQ,  

} from './boots';

/**
 *
 * @param {*} app
 * @param {*} router
 * @param {*} apis
 * @param {*} commands
 * @param {*} events
 */
export default function (app, apis) {
  series([    
    // RabbitMQ
    // (next) => {
    //   loadRabbitMQ(__dirname, apis)
    //     .then(() => {
    //       next(null);
    //     })
    //     .catch((reason) => {
    //       next(new Error(reason));
    //     });
    // },
    // env variables & application insights
    (next) => {
      dotenv.config();
      if (process.env.NODE_ENV === 'development') {
        dotenv.config();
      }
      // initialize momentjs
      moment.locale('en-US');
      next(null);
    },
    // Error handling. The `ValidationError` instances thrown by objection.js have a `statusCode`
    // property that is sent as the status code of the response.
    (next) => {
      app.use((err, req, res, nexti) => {
        if (err) {
          res
            .status(err.statusCode || err.status || 500)
            .send(err.data || err.message || {});
        } else {
          nexti();
        }
      });
      next(null);
    },
  ], (err, results) => {
    if (err) {
      console.error(err);
    }
    // console.log(results);
  });

  // bootstrap apis
  apis.forEach((api) => {
    series([
      // load swagger ui
      (next) => {
        loadSwaggerUi(app, api)
          .then(() => {
            next(null);
          })
          .catch((reason) => {
            next(new Error(reason));
          });
      },
      // connect mongo databases
      (next) => {
        loadMongoDb(api)
          .then(() => {
            next(null);
          })
          .catch((reason) => {
            next(new Error(reason));
          });
      },
      // register rest api routes
      (next) => {
        loadRoutes(__dirname, app, api)
          .then(() => {
            next(null);
          })
          .catch((reason) => {
            next(new Error(reason));
          });
        ;
      }
    ], (err, results) => {
      if (err) {
        console.error(err);
      }
      // console.log(results);
    });
  });
}
