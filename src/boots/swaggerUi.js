import yaml from 'yamljs';
import swaggerUi from 'swagger-ui-express';

/**
 * load swagger ui docs
 */
export default async (app, api) => {
  const swaggerSpec = yaml.load(`./src/apis/${api}/docs.yaml`);
  app.get('/swagger.json', (req, res) => {
    // initialize swaggerspec
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerSpec);
  });
  app.use(`/${api}/api-docs`,
    swaggerUi.serve,
    swaggerUi.setup(swaggerSpec)
  );
}
