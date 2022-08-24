import * as express from 'express';
import cardController from './card.controller';

const router = express.Router();

router.get('/', cardController.getCards);

export default router;
