import styled from '@emotion/styled';
import { CircularProgress } from '@mui/material';
import {
  getCards,
  getRunningOperationPromises,
  useGetCardsQuery,
} from '../api/cards.api';
import { ResponsiveContainer } from '../components';
import FullCard from '../components/FullCard/FullCard';
import { wrapper } from '../store';

const CardsContainer = styled.div`
  margin-top: 1rem;
`;

export function Index() {
  const { data: cards, isLoading, isUninitialized } = useGetCardsQuery();

  return (
    <ResponsiveContainer>
      {(isUninitialized || isLoading) && <CircularProgress />}
      <CardsContainer>
        {!(isUninitialized || isLoading) &&
          cards?.map((card, index) => (
            <FullCard key={card._id} index={index + 1} card={card}></FullCard>
          ))}
      </CardsContainer>
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
