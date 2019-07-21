import mongodb from './mongodb';
import swaggerUi from './swaggerUi';
import routes from './routes';
import rabbitmq from './rabbitmq';

export const loadMongoDb = mongodb;
export const loadSwaggerUi = swaggerUi;
export const loadRoutes = routes;
export const loadRabbitMQ = rabbitmq;
