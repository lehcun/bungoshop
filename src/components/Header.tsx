import React from 'react';
import Logo from './Logo';
import UserActions from './UserActions';
import NavBar from './NavBar';
import Container from './Container';

const Header = () => {
  return (
    <header className="sticky top-0 z-50 bg-white/70">
      <Container className="flex items-center justify-between py-5">
        <Logo />
        <NavBar />
        <UserActions />
      </Container>
    </header>
  );
};

export default Header;
