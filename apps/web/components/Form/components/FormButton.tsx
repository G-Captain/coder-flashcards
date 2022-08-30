import { useFormContext, FieldValues, SubmitHandler } from 'react-hook-form';

import AppButton, { Props as AppButtonProps } from '../../AppButton/AppButton';

interface CustomProps {
  loading?: boolean;
  onClick: (formData: any) => void;
}

export interface Props extends CustomProps, Omit<AppButtonProps, 'onClick'> {}

const FormButton: React.FC<Props> = ({
  fullWidth = true,
  disabled = false,
  onClick,
  loading = false,
  ...restProps
}: Props) => {
  const { handleSubmit, reset, clearErrors } = useFormContext();

  /* eslint-disable react/jsx-props-no-spreading */
  return (
    <AppButton
      {...restProps}
      disabled={disabled}
      onClick={() => handleSubmit(onClick as SubmitHandler<FieldValues>)()}
      isLoading={loading}
      fullWidth={fullWidth}
    />
  );
};

export default FormButton;
