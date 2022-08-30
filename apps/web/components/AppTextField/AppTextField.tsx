import { useState, useCallback, useEffect } from 'react';

import {
  CircularProgress,
  TextField,
  InputAdornment,
  IconButton,
  TextFieldProps,
} from '@mui/material';
import { green } from '@mui/material/colors';
import { MdVisibility, MdVisibilityOff } from 'react-icons/md';
import FieldObject from '../../types/FieldObject';
import styled from '@emotion/styled';

interface CustomProps {
  isLoading?: boolean;
  register?: any;
  fieldObj?: FieldObject;
}

export type Props = CustomProps & TextFieldProps;

const StyledTextField = styled(TextField)`
  /* input:-webkit-autofill {
    box-shadow: ${({ theme }) => `0 0 0px 1000px white inset !important`};
    -webkit-box-shadow: ${({ theme }) =>
    `0 0 0px 1000px white inset !important`};
    -webkit-text-fill-color: ${({ theme }) => `white !important`};
    font-size: 1rem;
  }
  &.MuiTextField-root {
    margin-top: 1rem;

    .MuiInputBase-input {
      box-shadow: none;
    }
    input:-internal-autofill-selected {
      background-color: none !important;
    }
    input:-webkit-autofill {
      background-color: none !important;
    }
  } */
`;

const StyledCircularProgress = styled(CircularProgress)`
  color: ${green[700]};
  position: absolute;
  margin-left: auto;
  margin-right: auto;
`;

const AppTextField: React.FC<Props> = ({
  name,
  size,
  helperText,
  fullWidth,
  color,
  variant,
  required,
  type,
  error,
  isLoading,
  label,
  disabled,
  multiline,
  rows,
  fieldObj,
  InputProps,
  inputProps,
  register,
  onClick,
  onKeyPress,
  ...rest
}: Props) => {
  const [showPassword, setShowPassword] = useState(false);

  const clickHandler = (event) => {
    if (disabled || isLoading) return;
    onClick?.(event);
  };
  const showPasswordHandler = () => {
    setShowPassword((showPasswordVal) => !showPasswordVal);
  };
  const mouseDownPasswordHandler = (event) => {
    event.preventDefault();
  };
  const keyPressHandler = (event) => {
    if (event.charCode === 13 && !multiline) {
      event.preventDefault();
    }
    onKeyPress?.(event);
  };

  useEffect(() => {
    const value =
      typeof fieldObj?.value === 'object'
        ? fieldObj?.value?.value
        : fieldObj?.value || '';
    fieldObj?.onChange(value);
  }, [fieldObj?.value, name, fieldObj?.onChange]); // do not add fieldObj dependency

  const extendedInputProps = {
    ...InputProps,
    endAdornment: type === 'password' && (
      <InputAdornment position="end">
        <IconButton
          aria-label="toggle password visibility"
          onClick={showPasswordHandler}
          onMouseDown={mouseDownPasswordHandler}
          edge="end"
        >
          {showPassword ? <MdVisibility /> : <MdVisibilityOff />}
        </IconButton>
      </InputAdornment>
    ),
  };

  const getType = useCallback(() => {
    if (type === 'password') {
      return showPassword ? 'text' : 'password';
    }
    return type;
  }, [type, showPassword]);

  /* eslint-disable react/jsx-props-no-spreading */
  return (
    <StyledTextField
      name={name}
      label={label}
      required={required}
      type={getType()}
      variant={variant}
      color={color}
      error={error}
      size={size}
      helperText={helperText}
      disabled={isLoading || disabled}
      onClick={clickHandler}
      onKeyPress={keyPressHandler}
      fullWidth={fullWidth}
      multiline={multiline}
      rows={rows}
      InputProps={extendedInputProps}
      // eslint-disable-next-line react/jsx-no-duplicate-props
      inputProps={{}}
      {...(typeof fieldObj?.value === 'object'
        ? { ...fieldObj, value: fieldObj?.value?.value || '' }
        : fieldObj)}
      {...rest}
    />
  );
};

export default AppTextField;
