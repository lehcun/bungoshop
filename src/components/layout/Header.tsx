import React from 'react';
import Container from '../other/Container';
import Logo from '../ui/Logo';
import Search from '../ui/Search';
import UserActions from '../user/UserActions';
// import NavBar from './NavBar';

const Header = () => {
  return (
    <header className="bg-shop_bg/70 sticky top-0 z-50 shadow-lg shadow-black/10">
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
