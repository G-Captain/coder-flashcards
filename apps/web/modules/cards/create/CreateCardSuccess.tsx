import { useCallback } from 'react';
import { MdAdd, MdHome } from 'react-icons/md';
import { Alert } from '@mui/material';
import styled from '@emotion/styled';

import { AppButton } from '../../../components';
import { useAppDispatch } from '../../../hooks/store.hooks';
import { cardFormActions } from '../../../store/cardForm.slice';
import { useRouter } from 'next/router';

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

const CreateCardSuccess = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const newCardHandler = useCallback(() => {
    dispatch(
      cardFormActions.updateStep({
        step: 0,
      })
    );
  }, [dispatch]);

  const navigateHomeHandler = useCallback(async () => {
    await router.replace('/');
    dispatch(cardFormActions.resetFormData());
  }, [dispatch, router]);

  return (
    <Container>
      <Alert variant="outlined" severity="success">
        New card has been successfully added!
      </Alert>
      <ButtonRow>
        <AppButton
          onClick={newCardHandler}
          size="large"
          color="primary"
          variant="outlined"
          startIcon={<MdAdd />}
        >
          Add another
        </AppButton>
        <AppButton
          onClick={navigateHomeHandler}
          size="large"
          variant="outlined"
          color="primary"
          startIcon={<MdHome />}
        >
          Go to homepage
        </AppButton>
      </ButtonRow>
    </Container>
  );
};

export default CreateCardSuccess;
