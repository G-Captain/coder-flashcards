import * as express from 'express';

import cardRoute from '../modules/card/card.route';

const router = express.Router();

const defaultRoutes = [
  {
    path: '/cards',
    route: cardRoute,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

export default router;
