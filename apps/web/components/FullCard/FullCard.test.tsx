import { render, screen } from '@testing-library/react';
import { CardDto } from '../../types/Card.dto';
import FullCard from './FullCard';

describe('FullCard', () => {
  const card: CardDto = {
    id: 1,
    _id: 1,
    question: 'What is React?',
    answer: '&lt;p&gt;React is a JavaScript library&lt;/p&gt;',
    category: 'REACT',
  };

  const cardWithProblem: CardDto = {
    ...card,
    problem: '&lt;p&gt;Some problem&lt;/p&gt;',
  };

  it('should display answer as html', () => {
    render(<FullCard card={card} />);
    const answerParagraph = screen.queryByText('React is a JavaScript library');
    expect(answerParagraph.tagName).toBe('P');
  });

  it('should display Problem and Answer headers when problem in card', () => {
    render(<FullCard card={cardWithProblem} />);
    const problemHeader = screen.queryByText('Problem');
    const answerHeader = screen.queryByText('Answer');
    expect(problemHeader).toBeInTheDocument();
    expect(answerHeader).toBeInTheDocument();
  });

  it('should not display Problem and Answer headers when no problem in card', () => {
    render(<FullCard card={card} />);
    const problemHeader = screen.queryByText('Problem');
    const answerHeader = screen.queryByText('Answer');
    expect(problemHeader).not.toBeInTheDocument();
    expect(answerHeader).not.toBeInTheDocument();
  });
});
