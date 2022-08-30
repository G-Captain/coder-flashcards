import { JSDOM } from 'jsdom';
import DOMPurify from 'dompurify';
import { encode, decode } from 'html-entities';

import { CreateCardInput } from '../../types/CreateCard.input';
import cardRepo from './card.repo';

const getCards = () => cardRepo.getCards();

const purifyEncodedHtml = (html: string) => {
  const window = new JSDOM('').window;
  const purify = DOMPurify(window);

  const decodedAnswer = decode(html);

  const purifiedHtml = purify.sanitize(decodedAnswer);

  const purifiedEncodedHtml = encode(purifiedHtml);

  return purifiedEncodedHtml;
};

const createCard = (createCardInput: CreateCardInput) => {
  const cleanProblem = purifyEncodedHtml(createCardInput.problem);
  const cleanAnswer = purifyEncodedHtml(createCardInput.answer);

  const sanitizedCardInput: CreateCardInput = {
    ...createCardInput,
    problem: cleanProblem,
    answer: cleanAnswer,
  };
  return cardRepo.createCard(sanitizedCardInput);
};

export default { getCards, createCard };
