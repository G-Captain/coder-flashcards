import Card from './card.model';

const getCards = () => Card.find({ removed: false });

export default { getCards };
