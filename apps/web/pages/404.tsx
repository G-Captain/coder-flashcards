import styled from '@emotion/styled';
import { Typography } from '@mui/material';
import Image from 'next/image';
import ResponsiveContainer from '../components/ResponsiveContainer/ResponsiveContainer';

const ImageContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const NotFoundPage = () => {
  const breakpoint = 'mobile';

  return (
    <ResponsiveContainer>
      <ImageContainer>
        <Image
          src={'/page-404.svg'}
          alt="page-not-found"
          layout="fixed"
          width="280"
          height="280"
        />
        <Typography variant={breakpoint !== 'mobile' ? 'h3' : 'h4'}>
          Page not found
        </Typography>
      </ImageContainer>
    </ResponsiveContainer>
  );
};

export default NotFoundPage;
