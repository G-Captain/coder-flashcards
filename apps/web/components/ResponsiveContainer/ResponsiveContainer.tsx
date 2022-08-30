import styled from '@emotion/styled';
import { device } from '../../themes/device';

const Container = styled.div`
  display: flex;
  justify-content: center;
`;

const ResponsiveWrapper = styled.div`
  display: grid;
  margin-top: 0.5rem;
  grid-template-rows: 1fr auto;
  grid-template-columns: 1fr;
  width: 1600px;

  @media ${device.desktop} {
    width: 1400px;
  }

  @media ${device.laptop} {
    width: 1000px;
  }
  @media ${device.tablet} {
    width: 100%;
  }
  @media ${device.mobile} {
    width: 100%;
  }
`;

const ResponsiveContainer = ({ children }) => {
  return (
    <Container>
      <ResponsiveWrapper>{children}</ResponsiveWrapper>
    </Container>
  );
};

export default ResponsiveContainer;
