import { CreateCardInput } from '../../types/CreateCard.input';
import Card from './card.model';

const getCards = () => Card.find({ removed: false });

const createCard = (cardInput: CreateCardInput) =>
  Card.create({ ...cardInput, removed: false });

export default { getCards, createCard };
