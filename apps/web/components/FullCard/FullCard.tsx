import { CardDto } from '../../types/Card.dto';
import { Paper, Typography } from '@mui/material';
import styled from '@emotion/styled';
import { useMemo } from 'react';
import { decode } from 'html-entities';

interface Props {
  card: CardDto;
  index: number;
}

const StyledPaper = styled(Paper)`
  padding: 1rem;
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
`;

const Question = styled(Typography)`
  margin-bottom: 1rem;
`;

const Problem = styled.div`
  margin-bottom: 1rem;
`;

const Answer = styled.div`
  margin-bottom: 1rem;
`;

const getHtml = (value) => {
  let problemStr = '';
  try {
    problemStr = value ? decode(value) : '';
  } catch (err) {
    return '';
  }
  return problemStr;
};

const FullCard = ({ card, index }: Props) => {
  const problem = useMemo(() => getHtml(card.problem), [card.problem]);
  const answer = useMemo(() => getHtml(card.answer), [card.answer]);

  if (!card?.question || !answer) {
    return null;
  }

  return (
    <StyledPaper variant="outlined">
      <Question variant="h5">{`${index}. ${card.question}`}</Question>

      {problem && (
        <Problem
          dangerouslySetInnerHTML={{
            __html: problem,
          }}
        />
      )}
      <Answer
        dangerouslySetInnerHTML={{
          __html: answer,
        }}
      />
    </StyledPaper>
  );
};

export default FullCard;
