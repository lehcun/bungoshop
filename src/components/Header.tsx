import React from 'react';
import Logo from './Logo';
import UserActions from './UserActions';
import NavBar from './NavBar';

const Header = () => {
  return (
    <div className="sticky top-0 z-50 bg-white/70">
      <header className="mx-auto flex max-w-7xl items-center justify-between px-4 py-5">
        <Logo />
        <NavBar />
        <UserActions />
      </header>
    </div>
  );
};

export default Header;
