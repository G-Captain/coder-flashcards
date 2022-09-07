import { useCallback } from 'react';
import { animateScroll as scroll } from 'react-scroll';
import { IconButton, AppBar, Toolbar } from '@mui/material';
import { MdAdd, MdMenu } from 'react-icons/md';
import styled from '@emotion/styled';

import { device } from '../../themes/device';
import Logo from '../Logo/Logo';
import { useRouter } from 'next/router';
import ResponsiveContainer from '../ResponsiveContainer/ResponsiveContainer';
import AppButton from '../AppButton/AppButton';

const StyledAppBar = styled(AppBar)`
  background-color: #ffffff;
  border-top-width: 0;
  border-left-width: 0;
  border-right-width: 0;
  color: ${({ theme }) => {
    return theme.palette.primary.main;
  }};
`;

const StyledToolbar = styled(Toolbar)`
  .MuiButton-root {
    margin-left: 1rem;
  }
`;

const Filler = styled.div`
  flex-grow: 1;
`;

const SectionDesktop = styled.div`
  display: none;

  @media ${device.laptop} {
    display: flex;
    align-items: center;
  }
`;

const SectionMobile = styled.div`
  display: flex;
  align-items: center;

  @media ${device.laptop} {
    display: none;
  }
`;

const NavBar = () => {
  const router = useRouter();
  const logoClickHandler = useCallback(() => {
    if (location?.pathname === '/') {
      return scroll.scrollToTop();
    }
    return router.push('/');
  }, [router]);

  return (
    <StyledAppBar position="sticky" elevation={0} variant="outlined">
      <ResponsiveContainer>
        <StyledToolbar>
          <Logo onClick={logoClickHandler} />
          <Filler />
          <AppButton
            to="/cards/create"
            size="large"
            color="primary"
            variant="outlined"
            startIcon={<MdAdd />}
          >
            Create
          </AppButton>
          <SectionDesktop></SectionDesktop>
          <SectionMobile>
            <IconButton edge="start" color="inherit" aria-label="menu">
              <MdMenu />
            </IconButton>
          </SectionMobile>
        </StyledToolbar>
      </ResponsiveContainer>
    </StyledAppBar>
  );
};

export default NavBar;
