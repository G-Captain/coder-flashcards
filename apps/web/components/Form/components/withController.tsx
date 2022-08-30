/* eslint-disable react-hooks/rules-of-hooks */
import { useRef, useEffect, useCallback, useContext } from 'react';

import { useFormContext, useController } from 'react-hook-form';

import { CustomFormContext } from '../CustomFormContext';

export interface FieldObjProps {
  value: string;
  name: string;
  onBlur: () => void;
  onChange: () => void;
  ref: () => void;
}

export interface CustomProps {
  name: string;
  defaultValue?: string | number | boolean | Date;
  dynamicDefaultValue?: string | number | boolean | Date | null;
  onSubmit?: (formData: any) => void;
  [props: string]: any;
}

const withController = ({
  name,
  dynamicDefaultValue,
  defaultValue,
  onSubmit,
  ...restProps
}: CustomProps) =>
  function wrapper(WrappedComponent) {
    const { control, reset, handleSubmit } = useFormContext();
    const { isRequired } = useContext(CustomFormContext);

    const prevDefaultValueRef = useRef<any>(null);

    useEffect(() => {
      if (
        dynamicDefaultValue &&
        prevDefaultValueRef?.current !== dynamicDefaultValue
      ) {
        prevDefaultValueRef.current = dynamicDefaultValue;
        const resetFieldObj = {};
        resetFieldObj[name] = dynamicDefaultValue || '';
        reset(resetFieldObj);
      }
    }, [dynamicDefaultValue, reset]);

    const keyPressHandler = useCallback(
      (event) => {
        if (onSubmit && event.charCode === 13) {
          handleSubmit(onSubmit)();
        }
      },
      [handleSubmit]
    );

    if (!WrappedComponent) return null;

    const { field, formState } = useController({
      name,
      control,
      defaultValue: dynamicDefaultValue || defaultValue,
    });

    const fieldObj = field;

    const WrappedProps = {
      fieldObj,
      name,
      required: isRequired(name),
      error: !!formState?.errors?.[name],
      helperText: formState?.errors?.[name]?.message,
      onKeyPress: keyPressHandler,
      ...restProps,
    };

    /* eslint-disable react/jsx-props-no-spreading */
    return <WrappedComponent {...WrappedProps} />;
  };

export default withController;
