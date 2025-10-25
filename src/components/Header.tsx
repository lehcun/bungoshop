import React from 'react';
import Logo from './Logo';
import UserActions from './UserActions';
// import NavBar from './NavBar';
import Container from './Container';
import Search from './Search';

const Header = () => {
  return (
    <header className="sticky top-0 z-50 bg-white/70 shadow-lg shadow-black/10">
      <Container className="flex items-center justify-between py-5">
        <Logo />
        {/* <NavBar /> */}
        <Search />
        <UserActions />
      </Container>
    </header>
  );
};

export default Header;
