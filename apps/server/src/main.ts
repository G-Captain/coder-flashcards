import mongoose from 'mongoose';
import { server } from './app';
import { logger } from './config/logger';

const port = process.env.SERVER_PORT || 3080;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    logger.info('Connected to MongoDB');

    server.listen(port, () => {
      console.log(`Listening at http://localhost:${port}`);
    });
  })
  .catch((err) => logger.error('Error connecting to MongoDB.', err));
