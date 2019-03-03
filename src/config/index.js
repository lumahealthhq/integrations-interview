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
    }
});

const env = config.get('env');
config.loadFile('./src/config/' + env + '.json');

export default config;