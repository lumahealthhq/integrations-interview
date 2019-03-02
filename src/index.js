import express from 'express';
import morgan from 'morgan';
import bodyParser from "body-parser";
import boom from 'boom';

import config from './config';
import db from './db';
import routes from './routes';

const app = express();

app.use(bodyParser.json());
app.use(morgan("combined"));

app.use("/api", routes);

app.use((req, res, next) => {
    const error = new Error('Not Found');
    error.status = 404;
    return next(error);
});

app.use((err, req, res, next) => {
    if (req.headersSent) {
        return next(err);
    }

    if (boom.isBoom(err)) {
        const { output } = err;
        res.status(output.statusCode);
        return res.json(output.payload);
    }

    res.status(err.status || 500);
    res.json({
        message: err.message,
        error: {}
    });
});

db.authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
     app.listen(config.get('port'), function(err) {
         if (err) {
             console.error(err); 
         }
        console.log("Server started...");
    })
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

export default app;