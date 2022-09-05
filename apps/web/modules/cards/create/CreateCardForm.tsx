import * as yup from 'yup';
import { useCallback, useState } from 'react';
import dynamic from 'next/dynamic';
import { MdSave } from 'react-icons/md';
import { Typography } from '@mui/material';
import styled from '@emotion/styled';

import { CreateCardInput } from '../../../types/CreateCard.input';
import {
  AppButton,
  Form,
  FormButton,
  FormTextField,
} from '../../../components';
import { useAppDispatch, useRootSelector } from '../../../hooks/store.hooks';
import { cardFormActions } from '../../../store/cardForm.slice';
import { useRouter } from 'next/router';

const ISSERVER = typeof window === 'undefined';

let Editor = null;
if (!ISSERVER) {
  Editor = dynamic(() => import('../../../components/Editor/Editor'));
}

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

const ButtonRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 1rem;

  button {
    width: unset;
  }
`;

const schema = yup.object().shape({
  question: yup.string().required('Field is required'),
  // problem: yup.string().nullable(true),
  // answer: yup.string().required('Field is required'),
});

const CreateCardForm = () => {
  const { step, question, category, problem, answer } = useRootSelector(
    (store) => store.cardForm
  );
  const [problemText, setProblemText] = useState(problem);
  const [answerText, setAnswerText] = useState(answer);
  const dispatch = useAppDispatch();
  const router = useRouter();

  const saveCardHandler = useCallback(
    async (data: any) => {
      console.log('data', data);
      const cardInput: CreateCardInput = {
        question: data?.question,
        problem: problemText,
        answer: answerText,
        category: 'REACT',
      };

      dispatch(
        cardFormActions.updateGeneralData({
          ...cardInput,
          step: 1,
        })
      );
    },
    [problemText, answerText, dispatch]
  );

  const cancelHandler = () => {
    dispatch(cardFormActions.resetFormData());
    router.back();
  };

  return (
    <Form schema={schema}>
      <FieldWrapper>
        <QuestionLabel variant="h5">Question</QuestionLabel>
        <FormTextField
          name="question"
          label="Question"
          defaultValue={question}
          type="text"
          multiline
          rows={3}
        />
      </FieldWrapper>
      <FieldWrapper>
        <ProblemLabel variant="h5">Problem</ProblemLabel>
        <ProblemInfo variant="body1">
          You can expand on the question by describing the problem in the text
          editor below or leave it empty:
        </ProblemInfo>
        {!ISSERVER && (
          <Editor
            onValueChange={setProblemText}
            defaultValue={problem}
          ></Editor>
        )}
      </FieldWrapper>
      <AnswerLabel variant="h5">Answer</AnswerLabel>
      <FieldWrapper>
        {!ISSERVER && (
          <Editor onValueChange={setAnswerText} defaultValue={answer}></Editor>
        )}
      </FieldWrapper>
      <ButtonRow>
        <AppButton
          onClick={cancelHandler}
          // to=''
          size="large"
          variant="outlined"
          color="primary"
          // startIcon={<MdSave />}
        >
          Cancel
        </AppButton>
        <FormButton
          onClick={saveCardHandler}
          size="large"
          color="primary"
          startIcon={<MdSave />}
        >
          Save
        </FormButton>
      </ButtonRow>
    </Form>
  );
};

export default CreateCardForm;
