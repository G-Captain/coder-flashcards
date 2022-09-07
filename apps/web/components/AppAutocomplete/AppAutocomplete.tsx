import { Autocomplete, AutocompleteProps, TextField } from '@mui/material';
import styled from '@emotion/styled';
import FieldObject from '../../types/FieldObject';

interface CustomProps {
  name: string;
  variant?: string;
  type?: string;
  helperText?: string;
  required?: boolean;
  fieldObj?: FieldObject;
  error?: boolean;
  isLoading?: boolean;
  label?: string;
  register?: () => void;
}

export interface Props
  extends CustomProps,
    Omit<AutocompleteProps<any, any, any, any>, 'renderInput'> {}

const StyledAuctocomplete = styled(Autocomplete)`
  &.MuiAutocomplete-root {
    margin-top: 1rem;
    ${({ fullWidth, theme }) => {
      if (fullWidth) {
        return 'flex: 1';
      }
      return '';
    }};
  }

  .MuiAutocomplete-endAdornment {
    ${({ size }) => size === 'small' && `top: unset;`};
  }

  &.MuiInputBase-root {
    .MuiInputBase-input {
      box-shadow: none;
    }
    input:-internal-autofill-selected {
      background-color: none !important;
    }
    input:-webkit-autofill {
      background-color: none !important;
    }
  }
`;

const AppAutocomplete: React.FC<Props> = ({
  name = '',
  size = 'medium',
  multiple = false,
  helperText = '',
  fullWidth = false,
  color = 'primary',
  variant = 'outlined',
  required = false,
  type = 'text',
  error = false,
  isLoading = false,
  label = '',
  disabled = false,
  options,
  getOptionLabel,
  renderOption,
  fieldObj,
  defaultValue,
  onClick,
}: Props) => {
  /* eslint-disable react/jsx-props-no-spreading */
  return (
    <StyledAuctocomplete
      multiple={multiple}
      id={`autocomplete-${name}`}
      options={options}
      onChange={(event, val) => {
        fieldObj?.onChange?.(val);
      }}
      autoHighlight
      getOptionLabel={getOptionLabel}
      renderOption={renderOption}
      fullWidth={fullWidth}
      defaultValue={defaultValue || fieldObj?.value}
      filterSelectedOptions
      size={size}
      renderInput={(params) => (
        <TextField
          // eslint-disable react/jsx-props-no-spreading
          {...params}
          label={label}
          variant="outlined"
          inputProps={{
            ...params.inputProps,
            autoComplete: 'off', // disable autocomplete and autofill
          }}
          defaultValue={fieldObj?.value}
          name={name}
          error={error}
          helperText={helperText}
          required={required}
          size={size}
        />
      )}
    />
  );
};

export default AppAutocomplete;
