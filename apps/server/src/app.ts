import http from 'http';
import express from 'express';

import router from './routes';

const app = express();
const server = http.createServer(app);

// v1 api routes
app.use(process.env.API_V1_ROUTE, router);

export { server, app };
