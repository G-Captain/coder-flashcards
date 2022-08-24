import * as httpStatus from 'http-status';
import { logger } from '../../config/logger';
import { internalServerError } from '../../util/internalServerError';
import cardService from './card.service';

const getCards = async (req, res, next) => {
  try {
    const lots = await cardService.getCards();
    return res.status(httpStatus.OK).send(lots);
  } catch (err) {
    logger.error(`getCards error. ${err}`);
    return next(internalServerError);
  }
};

export default {
  getCards,
};
