import http from 'http';
import express from 'express';
import cors from 'cors';

import router from './routes';
import { corsOptions } from './util/app/cors';
const app = express();
const server = http.createServer(app);

// enable cors
app.use(cors(corsOptions));

app.use(express.json({ limit: '50mb' }));
// to support JSON-encoded bodies
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// v1 api routes
app.use(process.env.API_V1_ROUTE, router);

export { server, app };
