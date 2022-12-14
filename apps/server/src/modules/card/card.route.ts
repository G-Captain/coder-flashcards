import * as express from 'express';
import cardController from './card.controller';

const router = express.Router();

router.get('/', cardController.getCards);
router.post('/', cardController.createCard);

export default router;
