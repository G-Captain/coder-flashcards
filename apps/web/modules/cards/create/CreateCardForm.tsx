import * as yup from 'yup';
import { useCallback, useMemo, useState } from 'react';
import { MdSave } from 'react-icons/md';
import { Typography } from '@mui/material';
import styled from '@emotion/styled';

import { CreateCardInput } from '../../../types/CreateCard.input';
import {
  AppButton,
  Form,
  FormButton,
  FormTextField,
  FormAutocomplete,
  FormEditor,
} from '../../../components';
import { useAppDispatch, useRootSelector } from '../../../hooks/store.hooks';
import { cardFormActions } from '../../../store/cardForm.slice';
import { useRouter } from 'next/router';
import {
  CategoryOption,
  categoryOptions,
  getCategoryOption,
} from '../../../types/Category';
import Image from 'next/image';

const FieldWrapper = styled.div`
  margin-bottom: 1rem;
`;

const CategoryLabel = styled.div`
  margin-left: 1rem;
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
  category: yup.object().required('Field is required').nullable(true),
  problem: yup.string().required('Field is required').nullable(true),
  answer: yup.string().required('Field is required').nullable(true),
});

const CreateCardForm = () => {
  const { step, question, category, problem, answer } = useRootSelector(
    (store) => store.cardForm
  );
  const [problemText, setProblemText] = useState(problem);
  const [answerText, setAnswerText] = useState(answer);
  const dispatch = useAppDispatch();
  const router = useRouter();

  const defaultCategoryOption = useMemo(
    () => getCategoryOption(category),
    [category]
  );

  const saveCardHandler = useCallback(
    async (data: { question: string; category: CategoryOption }) => {
      const cardInput: CreateCardInput = {
        question: data?.question,
        problem: problemText,
        answer: answerText,
        category: data?.category.value,
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
        <FormAutocomplete
          options={categoryOptions}
          name="category"
          label="Category"
          size="small"
          getOptionLabel={(option) => option.label}
          defaultValue={defaultCategoryOption}
          renderOption={(props, option: CategoryOption) => (
            <li {...props}>
              <Image
                loading="lazy"
                src={option.imageSrc}
                alt={option.value}
                width="20"
                height="20"
              />
              <CategoryLabel>{option.label}</CategoryLabel>
            </li>
          )}
        />
      </FieldWrapper>
      <FieldWrapper>
        <ProblemLabel variant="h5">Problem</ProblemLabel>
        <ProblemInfo variant="body1">
          You can expand on the question by describing the problem in the text
          editor below or leave it empty:
        </ProblemInfo>
        <FormEditor
          name="problem"
          onValueChange={setProblemText}
          defaultValue={problem}
        ></FormEditor>
      </FieldWrapper>
      <AnswerLabel variant="h5">Answer</AnswerLabel>
      <FieldWrapper>
        <FormEditor
          name="answer"
          onValueChange={setAnswerText}
          defaultValue={answer}
        ></FormEditor>
      </FieldWrapper>
      <ButtonRow>
        <AppButton
          onClick={cancelHandler}
          size="large"
          variant="outlined"
          color="primary"
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
