import convict from 'convict';

const config = convict({
    env: {
        doc: "The application environment.",
        format: ["production", "development", "test"],
        default: "development",
        env: "NODE_ENV"
      },
      port: {
        doc: "The port to bind.",
        format: "port",
        default: 8080,
        env: "PORT",
        arg: "port"
      },
      db: {
        host: {
          doc: "Database host name/IP",
          format: '*',
          default: 'localhost'
        },
        name: {
          doc: "Database name",
          format: String,
          default: 'users'
        }
      }
    });

const env = config.get('env');

// Perform validation
config.validate({allowed: 'strict'});

export default config;