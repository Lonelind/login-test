const appConfig = require('./config');
const port = parseInt(process.env.PORT, 10) || appConfig.port || 3000;

const server = require('./server');

const next = require('next');
const app = next(require('./next.config'));

app.prepare().then(async () => await server(
    port,
    app.getRequestHandler(),
    app.render
));
