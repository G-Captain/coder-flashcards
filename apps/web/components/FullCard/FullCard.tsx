import { useMemo } from 'react';
import { CardDto } from '../../types/Card.dto';
import { Paper, Typography } from '@mui/material';
import styled from '@emotion/styled';
import { decode } from 'html-entities';
import useSyntaxHighlight from '../../hooks/useSyntaxHighlight';
import { getCategoryOption } from '../../types/Category';
import Image from 'next/image';

interface Props {
  card: Omit<CardDto, 'id' | '_id'>;
  index?: number;
}

const StyledPaper = styled(Paper)`
  padding: 1rem;
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
`;

const QuestionContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Question = styled(Typography)`
  margin-bottom: 1rem;
`;

const Wrapper = styled.div``;

const Header = styled(Typography)`
  margin-bottom: 0.5rem;
  color: grey;
`;

const Category = styled.div`
  display: flex;
  align-items: center;
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
  const question = useMemo(
    () => (index ? `${index}. ${card.question}` : card.question),
    [card.question, index]
  );

  const categoryOption = useMemo(
    () => getCategoryOption(card.category),
    [card.category]
  );

  useSyntaxHighlight();

  if (!card?.question || !answer) {
    return null;
  }

  return (
    <StyledPaper variant="outlined" className="full-card">
      <QuestionContainer>
        <Question variant="h5">{question}</Question>
        <Category>
          <Image
            loading="lazy"
            src={categoryOption?.imageSrc || ''}
            alt={categoryOption?.value}
            width="30"
            height="30"
          />
        </Category>
      </QuestionContainer>

      {problem && (
        <Wrapper>
          <Header variant="body2">Problem</Header>
          <Problem
            dangerouslySetInnerHTML={{
              __html: problem,
            }}
          />
          <Header variant="body2">Answer</Header>
        </Wrapper>
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
