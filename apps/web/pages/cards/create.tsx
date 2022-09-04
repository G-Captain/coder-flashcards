import styled from '@emotion/styled';
import { Paper } from '@mui/material';
import { ResponsiveContainer } from '../../components';
import { useRootSelector } from '../../hooks/store.hooks';
import CreateCardForm from '../../modules/cards/create/CreateCardForm';
import CreateCardSummary from '../../modules/cards/create/CreateCardSummary';
import CreateCardSuccess from '../../modules/cards/create/CreateCardSuccess';

const StyledPaper = styled(Paper)`
  padding: 1rem;
  margin-top: 1rem;
`;

const CreateCardPage = () => {
  const { step } = useRootSelector((store) => store.cardForm);

  return (
    <ResponsiveContainer>
      <StyledPaper variant="outlined">
        {step === 0 && <CreateCardForm />}
        {step === 1 && <CreateCardSummary />}
        {step === 2 && <CreateCardSuccess />}
      </StyledPaper>
    </ResponsiveContainer>
  );
};

export default CreateCardPage;
