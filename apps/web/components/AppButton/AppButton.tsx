import styled from '@emotion/styled';
import { Button, ButtonProps, CircularProgress } from '@mui/material';
import { blue } from '@mui/material/colors';
import { useRouter } from 'next/router';

interface CustomProps {
  isLoading?: boolean;
  to?: string;
  underline?: boolean;
  component?: React.ReactNode;
}

export interface Props extends CustomProps, ButtonProps {}

const StyledButton = styled(Button)<Props>`
  white-space: nowrap;

  .MuiButton-label {
    text-transform: uppercase;
    text-decoration: ${({ underline }) =>
      underline === true ? 'underline' : 'none'};
  }
`;

const StyledCircularProgress = styled(CircularProgress)`
  color: ${blue[700]};
  position: absolute;
  margin-left: auto;
  margin-right: auto;
`;

const AppButton: React.FC<Props> = ({
  children,
  to = '',
  size = 'medium',
  fullWidth,
  color = 'primary',
  variant = 'contained',
  isLoading = false,
  underline = false,
  startIcon = null,
  endIcon = null,
  disabled = false,
  component = 'button',
  onClick = () => null,
  ...rest
}: Props) => {
  const router = useRouter();

  const clickHandler = (event) => {
    if (disabled || isLoading) return;
    if (to) {
      router.push(to);
    }
    onClick(event);
  };

  return (
    <StyledButton
      variant={variant}
      color={color}
      size={size}
      disabled={isLoading || disabled}
      onClick={clickHandler}
      fullWidth={fullWidth}
      startIcon={startIcon}
      endIcon={endIcon}
      component={component}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...rest}
    >
      {isLoading && <StyledCircularProgress size={16} />}
      {children}
    </StyledButton>
  );
};

export default AppButton;
