import styled from '@emotion/styled';
import { CircularProgress, Paper, Typography } from '@mui/material';
import {
  getCards,
  getRunningOperationPromises,
  useGetCardsQuery,
} from '../api/cards.api';
import ResponsiveContainer from '../components/ResponsiveContainer';
import { wrapper } from '../store';

const StyledPaper = styled(Paper)`
  padding: 1rem;
`;

const Question = styled(Typography)`
  margin-bottom: 1rem;
`;

export function Index() {
  const { data: cards, isLoading, isUninitialized } = useGetCardsQuery();
  console.log('Index ~ data', cards);

  return (
    <ResponsiveContainer>
      {(isUninitialized || isLoading) && <CircularProgress />}
      {!(isUninitialized || isLoading) &&
        cards?.map((card, index) => (
          <StyledPaper key={card._id} variant="outlined">
            <Question variant="h5">{`${index + 1}. ${card.question}`}</Question>
            <Typography variant="body1">{card.answer}</Typography>
          </StyledPaper>
        ))}
    </ResponsiveContainer>
  );
}

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (context) => {
    store.dispatch(getCards.initiate());

    await Promise.all(getRunningOperationPromises());

    return {
      props: {},
    };
  }
);

export default Index;
