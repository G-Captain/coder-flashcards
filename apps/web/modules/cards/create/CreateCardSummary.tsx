import { useCallback } from 'react';
import { MdSave, MdEdit } from 'react-icons/md';
import styled from '@emotion/styled';
import { encode } from 'html-entities';

import { CreateCardInput } from '../../../types/CreateCard.input';
import { AppButton, FullCard } from '../../../components';
import { useCreateCardMutation } from '../../../api/cards.api';
import { useAppDispatch, useRootSelector } from '../../../hooks/store.hooks';
import { cardFormActions } from '../../../store/cardForm.slice';

const Container = styled.div`
  margin-bottom: 1rem;
`;

const ButtonRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 1rem;

  button {
    width: unset;
  }
`;

const CreateCardSummary = () => {
  const [createCard, { isLoading, data, isError, status, error }] =
    useCreateCardMutation();
  const { step, ...cardDto } = useRootSelector((store) => store.cardForm);
  const dispatch = useAppDispatch();

  const backToEditHandler = useCallback(() => {
    dispatch(
      cardFormActions.updateStep({
        step: 0,
      })
    );
  }, [dispatch]);

  const createCardHandler = useCallback(
    async (data: any) => {
      const problemEncoded = encode(cardDto?.problem);

      const answerEncoded = encode(cardDto.answer);

      const cardInput: CreateCardInput = {
        question: cardDto.question,
        problem: problemEncoded,
        answer: answerEncoded,
        category: cardDto.category,
      };
      try {
        const createCardResponse = await createCard(cardInput).unwrap();
        dispatch(cardFormActions.createSuccess());
      } catch (error) {
        console.log(error);
      }
    },
    [
      cardDto?.problem,
      cardDto.answer,
      cardDto.question,
      cardDto.category,
      createCard,
      dispatch,
    ]
  );

  return (
    <Container>
      <FullCard card={cardDto}></FullCard>
      <ButtonRow>
        <AppButton
          onClick={backToEditHandler}
          // to=''
          size="large"
          variant="outlined"
          color="primary"
          startIcon={<MdEdit />}
        >
          Edit
        </AppButton>
        <AppButton
          onClick={createCardHandler}
          size="large"
          color="primary"
          startIcon={<MdSave />}
        >
          Create
        </AppButton>
      </ButtonRow>
    </Container>
  );
};

export default CreateCardSummary;
