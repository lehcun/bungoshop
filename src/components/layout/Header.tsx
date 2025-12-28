import React from 'react';
import Container from '../Container';
import Logo from '../ui/Logo';
import Search from '../ui/Search';
import UserActions from '../user/UserActions';
// import NavBar from './NavBar';

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
