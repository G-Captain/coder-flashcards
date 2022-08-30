import config from '../../config/config';

const whitelist = [config.baseWebsiteUrl, 'http://localhost', 'localhost'];

const corsOptions = {
  origin: whitelist,
  // origin: config.baseWebsiteUrl,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  credentials: true,
  allowedHeaders: ['Origin', 'Content-Type', 'Accept', 'Authorization'],
};

export { corsOptions };
