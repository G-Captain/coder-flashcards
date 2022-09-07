import styled from '@emotion/styled';
import { Typography } from '@mui/material';
import { device } from '../../themes/device';
import { GiBrainstorm } from 'react-icons/gi';
import { useTheme } from '@emotion/react';

interface CustomProps {
  onClick?: () => void;
}

const Wrapper = styled.div<CustomProps>`
  &:hover {
    cursor: ${({ onClick }) => (onClick ? 'pointer' : 'default')};
  }
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StyledTypography = styled(Typography)`
  &.MuiTypography-root {
    color: theme.palette.primary.main;
  }

  @media ${device.mobile} {
    display: none;
  }
`;

const Logo = ({ onClick }: CustomProps) => {
  const theme = useTheme();

  return (
    <Wrapper onClick={onClick}>
      <StyledTypography fontSize={'24px'} variant="caption">
        coder
      </StyledTypography>
      <GiBrainstorm color={theme.palette.primary.main} size="3rem" />
      <StyledTypography fontSize={'24px'} variant="caption">
        FLASHCARDS
      </StyledTypography>
    </Wrapper>
  );
};

export default Logo;
