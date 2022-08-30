import styled from '@emotion/styled';
import { Paper, Typography } from '@mui/material';
import { MdSave } from 'react-icons/md';
import FormTextField from '../../components/Form/components/FormTextField';
import {
  getRunningOperationPromises,
  useCreateCardMutation,
} from '../../api/cards.api';
import { wrapper } from '../../store';
import * as yup from 'yup';
import { Form, FormButton, ResponsiveContainer } from '../../components';
import { CreateCardInput } from '../../types/CreateCard.input';
import 'react-quill/dist/quill.snow.css';
import dynamic from 'next/dynamic';
import { useCallback, useState } from 'react';
import { encode } from 'html-entities';

const ISSERVER = typeof window === 'undefined';

let Editor = null;
if (!ISSERVER) {
  Editor = dynamic(() => import('../../components/Editor/Editor'));
}
const StyledPaper = styled(Paper)`
  padding: 1rem;
  margin-top: 1rem;
`;

const FieldWrapper = styled.div`
  margin-bottom: 1rem;
`;

const ProblemInfo = styled(Typography)`
  margin-bottom: 0.5rem;
`;

const QuestionLabel = styled(Typography)`
  margin-bottom: 1rem;
`;

const ProblemLabel = styled(Typography)`
  margin-bottom: 0.5rem;
`;

const AnswerLabel = styled(Typography)`
  margin-bottom: 1rem;
`;

const schema = yup.object().shape({
  question: yup.string().required('Field is required'),
  // problem: yup.string().nullable(true),
  // answer: yup.string().required('Field is required'),
});

const CreateCardPage = () => {
  const [problem, setProblem] = useState();
  const [answer, setAnswer] = useState();

  const [createCard, { isLoading, data, isError, status, error }] =
    useCreateCardMutation();

  const createCardHandler = useCallback(
    async (data: any) => {
      const problemEncoded = encode(problem);

      const answerEncoded = encode(answer);
      console.log('answerStringified', answerEncoded);
      const cardInput: CreateCardInput = {
        question: data?.question,
        problem: problemEncoded,
        answer: answerEncoded,
        category: 'REACT',
      };
      const createCardResponse = await createCard(cardInput).unwrap();
      console.log('createCardResponse', createCardResponse);
    },
    [answer, problem, createCard]
  );

  return (
    <ResponsiveContainer>
      <StyledPaper variant="outlined">
        <Form schema={schema}>
          <FieldWrapper>
            <QuestionLabel variant="h5">Question</QuestionLabel>
            <FormTextField
              name="question"
              label="Question"
              defaultValue={''}
              type="text"
              multiline
              rows={3}
            />
          </FieldWrapper>
          <FieldWrapper>
            <ProblemLabel variant="h5">Problem</ProblemLabel>
            <ProblemInfo variant="body1">
              You can expand on the question by describing the problem in the
              text editor below or leave it empty:
            </ProblemInfo>
            {!ISSERVER && <Editor onValueChange={setProblem}></Editor>}
          </FieldWrapper>
          <AnswerLabel variant="h5">Answer</AnswerLabel>
          <FieldWrapper>
            {!ISSERVER && <Editor onValueChange={setAnswer}></Editor>}
          </FieldWrapper>
          <FormButton
            onClick={createCardHandler}
            size="large"
            color="primary"
            startIcon={<MdSave />}
          >
            Save
          </FormButton>
        </Form>
      </StyledPaper>
    </ResponsiveContainer>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (context) => {
    await Promise.all(getRunningOperationPromises());

    return {
      props: {},
    };
  }
);

export default CreateCardPage;
