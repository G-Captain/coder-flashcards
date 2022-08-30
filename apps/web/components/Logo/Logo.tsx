import styled from '@emotion/styled';
import { Typography } from '@mui/material';
import { device } from '../../themes/device';
import { GiBrainstorm } from 'react-icons/gi';

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
    color: crimson;
  }

  @media ${device.mobile} {
    display: none;
  }
`;

const Logo = ({ onClick }: CustomProps) => {
  return (
    <Wrapper onClick={onClick}>
      <StyledTypography fontSize={'24px'} variant="caption">
        coder
      </StyledTypography>
      <GiBrainstorm color="crimson" size="3rem" />
      <StyledTypography fontSize={'24px'} variant="caption">
        FLASHCARDS
      </StyledTypography>
    </Wrapper>
  );
};

export default Logo;
