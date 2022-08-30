import { useEffect, useState } from 'react';

import {
  useForm,
  FormProvider,
  useWatch,
  FieldError,
  FieldErrors,
  Mode,
  UseFormReturn,
} from 'react-hook-form';

import { yupResolver } from '@hookform/resolvers/yup';
import { Alert, Collapse, CollapseProps } from '@mui/material';

import { CustomFormProvider } from './CustomFormContext';
import styled from '@emotion/styled';

interface CustomProps {
  children: React.ReactNode;
  errors?: FieldErrors;
  mode?: Mode;
  schema: any;
  watchFields?: string[];
  onWatchChange?: (values: any[]) => void;
  labels?: any;
}

interface CustomCollapseProps {
  error?: FieldError;
}

interface StyledCollapseProps extends CustomCollapseProps, CollapseProps {}

const StyledCollapse = styled(Collapse)<StyledCollapseProps>`
  margin: 1rem 0;
  margin: ${({ error }) => (error ? '1rem 0' : '0')};
`;

const Form = ({
  children,
  schema,
  mode = 'onSubmit',
  labels,
  watchFields = [],
  onWatchChange,
}: CustomProps) => {
  const {
    handleSubmit,
    control,
    formState,
    register,
    watch,
    trigger,
    reset,
    clearErrors,
    ...rest
  }: UseFormReturn = useForm({
    mode,
    resolver: yupResolver(schema),
  });

  const [watchedValuesState, setWatchedValuesState] = useState<string[]>([]);

  const watchedValues = useWatch({
    control,
    name: watchFields || [], // without supply name will watch the entire form, or ['firstName', 'lastName'] to watch both
    // defaultValue: 'default' // default value before the render
  });

  useEffect(() => {
    if (onWatchChange && watchedValuesState !== watchedValues) {
      setWatchedValuesState(watchedValues);
      onWatchChange?.(watchedValues);
    }
  }, [watchedValues, watchedValuesState, onWatchChange]);

  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const errorFieldsKeys = Object.keys(formState?.errors);
    let errorMessageString = '';
    if (errorFieldsKeys?.length > 0 && labels) {
      const errorFieldLabels = errorFieldsKeys.map(
        (key) => labels?.[key] || key
      );
      errorMessageString = `Error in fields: ${errorFieldLabels.join(', ')}`;
    }

    setErrorMessage(errorMessageString);
  }, [formState?.errors, labels]);

  return (
    /* eslint-disable react/jsx-props-no-spreading */
    <>
      <StyledCollapse in={!!errorMessage}>
        <Alert severity="error">{errorMessage}</Alert>
      </StyledCollapse>
      <FormProvider
        {...{
          handleSubmit,
          control,
          formState,
          register,
          watch,
          trigger,
          reset,
          clearErrors,
          ...rest,
        }}
      >
        <CustomFormProvider schema={schema}>
          <form>{children}</form>
        </CustomFormProvider>
      </FormProvider>
    </>
  );
};

export default Form;
